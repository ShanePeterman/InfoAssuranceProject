import { Component, inject, OnInit, Sanitizer } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CryptoService } from '../../services/crypto.service';
import { IpfsService } from '../../services/ipfs.service';
import { BlockchainService } from '../../services/blockchain.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css',
})
export class FileUploadComponent implements OnInit{
  safeUrl: SafeResourceUrl | null = null;
  sanitizer: DomSanitizer = inject(DomSanitizer);
  cryptoSvc: CryptoService = inject(CryptoService);
  ipfsSvc: IpfsService = inject(IpfsService);
  blockSvc:BlockchainService = inject(BlockchainService);

  async ngOnInit() {
    this.blockSvc.oninit();
  }

  async handleUpload(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.result) {
        // this.safeUrl = this.sanitizeUrl(reader.result);
        const encryptedData = this.cryptoSvc.encryptData(
          reader.result as string
        );
        const ipfsHash = this.ipfsSvc.storeData(encryptedData).then((value)=> {
          this.blockSvc.addHash(value);
        })
      } else {
        window.alert('Error uploading file');
      }
    };
  }

  async onClick2(){
    const hashResponse:any = await this.blockSvc.getHashes();
    const ipfsHash = hashResponse[0];
    const encryptedData = await this.ipfsSvc.retrieveData(ipfsHash);
    const decryptedData = this.cryptoSvc.decryptData(encryptedData);
    this.safeUrl = this.sanitizeUrl(decryptedData);
  }

  sanitizeUrl(url: string | ArrayBuffer) {
    return this.sanitizer.bypassSecurityTrustResourceUrl('' + url as string);
  }
}
