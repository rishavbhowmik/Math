class BigPositiveInteger{
    constructor(s){
        if(s instanceof BigPositiveInteger){
            this.number = `${s.string()}`;
        }else
        {this.number = `${s}`;}
    }

    string(){
        return this.number
    }

    add(s){
        var n;
        if(s instanceof BigPositiveInteger) {
            n = `${s.string()}`
        } else {
            n = `${s}`
        }
        return new BigPositiveInteger(BigPositiveInteger.add(this.string(), n))
    }

    compare(s){
        var n;
        if(s instanceof BigPositiveInteger) {
            n = `${s.string()}`
        } else {
            n = `${s}`
        }
        return BigPositiveInteger.compare(this.string(), n);
    }

    static compare(n1, n2){
        if((typeof n1 != 'string')||(typeof n2 != 'string')){
            throw Error("Bad Input")
        }

        n1 = n1.split('').reverse()
        n2 = n2.split('').reverse()

        if(n1.length > n2.length) {
            return 1;
        }else if(n1.length < n2.length){
            return -1;
        }

        const max = Math.max(n1.length, n2.length)

        for(var i=0; i<max; i++){
            if(Number(n1[i])>Number(n2[i])){
                return 1;
            }
            else if(Number(n1[i])<Number(n2[i])){
                return -1;
            }
        }

        return 0;
    }

    static add(n1, n2){
        if((typeof n1 != 'string')||(typeof n2 != 'string')){
            throw Error("Bad Input")
        }

        n1 = n1.split('').reverse()
        n2 = n2.split('').reverse()

        var carry = [0], res = [];

        const max = Math.max(n1.length, n2.length)
        var i;
        for(i=0; i<max; i++){
            var a10 = (Number(n1[i] || 0) + Number(n2[i] || 0)) + carry[i]
            if(a10>9) {
                carry.push( Number(`${a10}`[0] ))
                res.push( `${a10}`[1] )
            }
            else {
                carry.push( 0 )
                res.push(a10)
            }

        }

        return res.reverse().join('')
    }

    static substract(n1, n2){
        if((typeof n1 != 'string')||(typeof n2 != 'string')){
            throw Error("Bad Input")
        }

        const comp = BigPositiveInteger.compare(n1, n2)

        if(comp == 0)return 0;

        n1 = n1.split('').reverse()
        n2 = n2.split('').reverse()

        var carry = [0], res = []
        var i;
        if(comp>0){
            //when n1>n2
            const max = n1.length

            for(i=0; i<max; i++){
                var  u = (Number(n1[i] || 0) - carry[i])
                //console.log('u', u, 'c', carry[i], 'n1', Number(n1[i] || 0), 'n2', Number(n2[i] || 0))
                if(u < Number(n2[i] || 0)){
                    carry.push(1)
                    u+=10 
                }else {
                    carry.push(0)
                }
                
                res.push(u - Number(n2[i] || 0))
            }
            return res.reverse().join('')
        }
        else{
            //when n1<n2
            const max = n2.length

            for(i=0; i<max; i++){
                var  u = (Number(n2[i] || 0) - carry[i])
                //console.log('u', u, 'c', carry[i], 'n1', Number(n1[i] || 0), 'n2', Number(n2[i] || 0))
                if(u < Number(n1[i] || 0)){
                    carry.push(1)
                    u+=10 
                }else {
                    carry.push(0)
                }
                
                res.push(u - Number(n1[i] || 0))
            }
            return "-"+res.reverse().join('')
        }

    }
}


//tests
//var num = new BigPositiveInteger("1551231239920808234080982309823098234098234098230498230948230999999")

//var sum = num.add(new BigPositiveInteger("1223199823984089238798723987239872398479872987324807203480980928348"))

//console.log(`Sum : ${sum.string()}`)

//console.log(`compare : ${BigPositiveInteger.compare("323", "321")}`)

//console.log(`Sub : ${BigPositiveInteger.substract('1551231239920808234080982309823098234098234098230498230948230999999', '32991329913299132991')}`)

//console.log(`Sub : ${BigPositiveInteger.substract('122319982398408923879872398723987239847987298732480720348098092834898723984798723948732991329913299132991', '15512312399208082340809823098230982340982340982304982309482309999991551231239920808234080982309823098234098234098230498230948230999999')}`)