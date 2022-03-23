const {average}=require('../utils/for_testing');

describe.skip('average',()=>{//para hacer un grupo
    test('un valor es su valor mismo',()=>{
        expect(average([1])).toBe(1);
    })
    test('un valor es correcto',()=>{
        expect(average([1,2,3,4,5,6])).toBe(3.5);
    })
    test('the un array vacio es ',()=>{
        expect(average([])).toBe(0);
    })
})