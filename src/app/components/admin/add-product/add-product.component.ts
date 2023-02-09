import { Observable, Subscriber } from 'rxjs';
import { ErrorHandle } from 'src/app/shared/services/interface/error-handle';
import { ProductModel } from './../../../models/product.model';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ImageServiceService } from 'src/app/shared/service-image/image-service.service';
import { AddProductService } from 'src/app/shared/services/admin/add-product.service';
class ImageSnippet {
  constructor(public src: string, public file: File) { }
}
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})

export class AddProductComponent {
  public elements: Array<unknown> = [];
  public formGroup: FormGroup
  public myImage!: Observable<any>;
  base64!: any;

  errorHandle: ErrorHandle = {};
  constructor(public adminService: AddProductService, private fb: FormBuilder, public imageService: ImageServiceService) {
    this.formGroup = this.fb.group<ProductModel>({
      create_product_by: '',
      id: '',
      product_name: '',
      product_review: 0,
      product_desc: '',
      product_color: '',
      product_additional: {
        size: '',
        price: '',
        quality: ''
      },
      product_image: {
        base64: '',
        name: ''
      },
    })
  }

  public appendElement(): void {
    this.elements = [...this.elements, this.elements.length + 1]; // Just append anything, since you are not using the values otherwise, appending a generic ID here
  }

  public caller(): void {
    // Do whatever you want when your appended elements are clicked
  }
  uploadCLick() {
    document.getElementById('file-upload')?.click()
  }
  showPreview(event: Event) {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0]
    this.convertToBase64(file)
  }

  async Submit() {
    try {
      this.formGroup.value.product_image.base64 = this.base64
      await this.imageService.SaveData(this.formGroup.value)
    } catch (error) {
      this.errorHandle = error as ErrorHandle
    }
  }

  convertToBase64(file: File) {
    const obs = new Observable((subscribe: Subscriber<any>) => {
      this.readerFile(file, subscribe)
    })
    obs.subscribe(data => {
      this.myImage = data;
      this.base64 = data
    })
  }

  readerFile(file: File, sub: Subscriber<any>) {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)

    fileReader.onload = () => {
      sub.next(fileReader.result)
      sub.complete()
    }

    fileReader.onerror = () => {
      sub.error();
      sub.complete()

    }
  }
}
