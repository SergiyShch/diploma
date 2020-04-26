export const getAllTops = (data) => {
  let g = [];

  data.map(item => g.push(item.x));
  const res = [...new Set(g)];
  return res;
}

const getMatrix = (data, prop) => {
  const matrix = [];
  const tops = getAllTops(data);
  const array = new Array(tops.length).fill(0);

  tops.map(top => {
    let arr = [...array];

    data.map(item => {
      if (item.x === top) {
         let ind = tops.indexOf(item.y);
         arr[ind] = item[prop];
      }
    })
    matrix.push(arr);
  })
  return matrix;
}

const getWeightMap = (g, startPoint, points) => {
  const visitedNode = new Array(g.length).fill(0);
  const weightMap = new Array(g.length).fill(Infinity);
  
  let currentNode = getAllTops(points).indexOf(startPoint);
  weightMap[currentNode] = 0;

  let counter = 1;

  while (visitedNode.indexOf(0) > -1) {
    for (let j in g[currentNode]) {
      if (
        visitedNode[j] ||
        g[currentNode][j] + weightMap[currentNode] > weightMap[j] ||
        g[currentNode][j] === 0
      ) {
        continue;
      }

      weightMap[j] = g[currentNode][j] + weightMap[currentNode];
    }
    visitedNode[currentNode] = 1;

    currentNode += counter;

    if (currentNode >= g.length) {
      
      currentNode = startPoint;
      
      counter = -1;
    }
  }

  return weightMap;
}

function getShortestPath(g, weightsMap, endPoint, points) {
  let endPos = getAllTops(points).indexOf(endPoint); 

  let endNodeWeight = weightsMap[endPos]; 
  
  const path = [];

  let pos = endPos; 
 
  while (endNodeWeight !== 0) {

    for (let i in g[pos]) {

      if (endNodeWeight === g[pos][i] + weightsMap[i]) {

        path.unshift(+i);

        endNodeWeight = weightsMap[i];

        pos = i;
      }
    }
  }
  path.push(endPos);

  const results = path.map(item => item = getAllTops(points)[item]);
  
  return results;
}

export const calculateKolonaMarshrut = (speed, points, start, finish, res) => {
  
  const g = getMatrix(getTimeGraph(points, speed), 'vaga');

  const weightsMap = getWeightMap(g, start, getTimeGraph(points, speed));
  
  const path = getShortestPath(g, weightsMap, finish, getTimeGraph(points, speed));
  
  const getTime = () => {
    let timeArr = [];

    for (let i = 0; i < path.length; i++){

       const r = getTimeGraph(points, speed).filter(el => el.x === path[i] && el.y === path[i + 1]);

       r.map(item => timeArr.push(item["vaga"]));
    }
    const result = timeArr.reduce((acc, cur) => acc + cur, 0);
    
    return result;
  }

  const time = getTime();

  const result = {"path": path, "time": time, "skladKolony": res};
  
  return result;
}

export const calculateMarshrut  = (points, start, finish) => {
  const g = getMatrix(points, 'length');

  const weightsMap = getWeightMap(g, start, points);

  const path = getShortestPath(g, weightsMap, finish, points);

  const countTops = getAllTops(points).reduce((acc, cur) => acc + 1, 0);

  const getLength = () => {

    let lengthArr = [];

    for (let i = 0; i < path.length; i++){

       const res = points.filter(el => el.x === path[i] && el.y === path[i + 1]);

       res.map(item => lengthArr.push(item["length"]));
    }

    const result = lengthArr.reduce((acc, cur) => acc + cur, 0);

    return result;
  }

  const countLength = getLength();

  const result = {"points": points, "path": path, "tops": countTops, "start": start, "finish": finish, "length": countLength, };

  return result;
}

export const getTimeGraph = (data, kolSpeed) => {
  
  const setSpeedLimitGraph = () => {

    return data.map(item => {

      const element = {...item};

      let sp = element.speed;

      let obj = {};

      for (let key in sp) {

        if (sp[key] >= kolSpeed) {

          obj[key] = kolSpeed;

        } else {

          obj[key] = sp[key];
        }
      }
      
      element.speed = obj;

      return element;
    });
  }

  const getTimeVaga = () => {
    const object = setSpeedLimitGraph();
    
    return object.map(item => {

      const element = {...item};

      let pLength = element.length;

      let keys = Object.keys(element.speed);

      keys.push(pLength.toString());

      keys = keys.map(item => parseFloat(item));

      let values = Object.values(element.speed);
      
      let time = 0;

      for (let i = 0; i < values.length; i++) {
        
        time += (keys[i + 1] - keys[i]) / values[i];
      }
      
      element.vaga = parseFloat(time.toFixed(2));
      
      return element;
    })
  }
  const res = getTimeVaga();

  return res;
} 