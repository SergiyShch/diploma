import {calculateKolonaMarshrut} from '../Marshrut/calculate';

export const calculateKolona = (obmejennia, trans, points, start, finish) => {
  
  const getSum = (arr, prop) => {
    const propsArray = arr.map(item => item[prop]);

    return propsArray.reduce((acc, cur) => acc + cur, 0);
  }

  //get all combinations of trans
  const getCombination = (mass, value) => {
    const kolonaSet = (function(arr, limit){
      let results = [], result, mask, total = Math.pow(2, arr.length);

      for(mask = 0; mask < total; mask++){
        result = [];
        let i = arr.length - 1; 
        do{
          if( (mask & (1 << i)) !== 0){
            result.push(arr[i]);
          }
        }while(i--);

        if( result.length === limit){
          results.push(result);
        }
      }

      return results; 

    })(mass, value);
    
    return kolonaSet;
  }

  //get optimal variants from all sets
  const getOptimalsFromIteration = (kolona, obm) => {
    // eslint-disable-next-line array-callback-return
    const obmezhKolonas = kolona.filter(item => { 
      if (
        getSum(item, "m") >= obm.mass &&
        getSum(item, 'pas') >= obm.passangers &&
        getSum(item, 'ob') >= obm.volume
      ) {
        return item;
      }
    })
    
    return obmezhKolonas;
  }

  //function of getting all possible sets with realizing of mass,passangers and volume kriterias from obmejennia
  const getMaxMarochniySklad = () => {
    let resultOptimals = [];

    for (let i = 1; i < trans.length; i++) {
      resultOptimals.push(getOptimalsFromIteration(getCombination(trans, i), obmejennia))
    }

    return resultOptimals;
  }

  //final function for optimize to one variant kolona
  const getOptimalKolona = () => {
    const variants =  getMaxMarochniySklad();

    //sort for max speed
    const getMaxSpeedFiltered = () => {
      let res = [];
      for (let i = 0; i < variants.length; i++) {
        let max = Math.max(
          ...variants[i].map(item => Math.min(...item.map(el => el.v)))
        )
        const result = variants[i].filter(item => Math.min(...item.map(el => el.v)) === max);
  
        res.push(result);
      }
      
      res = res.filter(item => item.length > 0);

      
      return res;
    } 

    const getSklad = () => {
      const speedFiltered = getMaxSpeedFiltered();

      const maxSpeed = speedFiltered.map(item => Math.max(...item.map(el => Math.min(...el.map(i => i.v)))))
      
      let max = maxSpeed.find(item => item === Math.max(...maxSpeed));
      
      max = maxSpeed.indexOf(max);

      const result = speedFiltered[max];

      return result[0];
    }

    let res = getSklad(); // склад колони

    let speed = Math.min(...res.map(item => item.v))
    
    const result = calculateKolonaMarshrut(speed, points, start, finish, res);
    
    return result;
  }

  return getOptimalKolona();
}
