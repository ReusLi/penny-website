import * as React from 'react'

import * as ReactCrop from 'react-image-crop'

interface Crop {
    aspect?: number;
    x: number;
    y: number;
    width?: number;
    height?: number;
}

interface PixelCrop {
    x: number;
    y: number;
    width: number;
    height: number;
}

export default class ImageCrop extends React.Component {
    imageRef: any = null

    fileUrl: any = null

    state = {
        src: '',
        croppedImageUrl: '',
        crop: {
            aspect: 1,
            width: 50,
            x: 0,
            y: 0,
        },
    }

    render() {
        const { crop, croppedImageUrl, src } = this.state;
        const Component = (ReactCrop as any).default

        return (
            <div>
                <div>
                    <input type="file" onChange={this.onSelectFile} />
                </div>
                {src && (
                    <Component
                        src={src}
                        crop={crop}
                        style={{ width: '500px' }}
                        onImageLoaded={this.onImageLoaded.bind(this)}
                        onComplete={this.onCropComplete.bind(this)}
                        onChange={this.onCropChange.bind(this)}
                    />
                )}
                {croppedImageUrl && (
                    <img src={croppedImageUrl}
                    />
                )}
            </div>
        );
    }

    onSelectFile = (e: any) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                this.setState({ src: reader.result })
            });
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    onImageLoaded = (image: HTMLImageElement) => {
        this.imageRef = image;
    };

    onCropComplete = (crop: Crop, pixelCrop: PixelCrop) => {
        this.makeClientCrop(crop, pixelCrop);
    };

    onCropChange = (crop: Crop) => {
        this.setState({ crop });
    };

    async makeClientCrop(crop: Crop, pixelCrop: PixelCrop) {
        if (this.imageRef && crop.width && crop.height) {
            const croppedImageUrl = await this.getCroppedImg(
                this.imageRef,
                pixelCrop,
                'newFile.jpeg',
            );
            this.setState({ croppedImageUrl });
        }
    }

    getCroppedImg(image: HTMLImageElement, pixelCrop: PixelCrop, fileName: string) {
        const canvas = document.createElement('canvas');
        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            image,
            pixelCrop.x,
            pixelCrop.y,
            pixelCrop.width,
            pixelCrop.height,
            0,
            0,
            pixelCrop.width,
            pixelCrop.height,
        );

        return new Promise((resolve, reject) => {
            canvas.toBlob((blob: any) => {
                blob.name = fileName;
                window.URL.revokeObjectURL(this.fileUrl);
                this.fileUrl = window.URL.createObjectURL(blob);
                resolve(this.fileUrl);
            }, 'image/jpeg');
        });
    }
}