class ImageFormat{
    
    constructor(
        public img : Buffer<ArrayBufferLike>,
        public color : string,
        public slot : number
    ){}
}

export default ImageFormat