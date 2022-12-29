const Sort = (arr) => {
    let newArr = [];
    let arrTemp = arr;

    for (let i = 0; i < arr.length; i++) {

        let max_val = arrTemp.reduce(function (result, item) {
            return (result.giaTien >= item.giaTien) ? result : item
        }, {});

        let tempAdd = arrTemp.filter((item) => item.id === max_val.id)

        newArr.push(tempAdd[0]);

        arrTemp = arrTemp.filter((item) => item.id !== max_val.id)
    }

    return newArr
}

export default Sort;