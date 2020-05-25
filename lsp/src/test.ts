export class Test {
    public num:number;
    constructor(num:number) {
        this.num = num;
    }
    public dispose(){
        console.log("test dispose");
        this.num = 0;
    }
}