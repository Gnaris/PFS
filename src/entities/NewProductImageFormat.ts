class NewProductImageFormat{
    
    constructor(
        public img : Buffer<ArrayBufferLike>,
        public color : string,
        public slot : number
    ){}
}

export default NewProductImageFormat