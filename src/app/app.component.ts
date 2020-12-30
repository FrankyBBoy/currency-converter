import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from './service/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  public listQuotes = [];
  public fromControl: FormControl;
  public toControl: FormControl;
  public amountControl: FormControl;
  public rate: number;
  public result: number;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.fromControl = new FormControl(null, [Validators.required]);
    this.toControl = new FormControl(null, [Validators.required]);
    this.amountControl = new FormControl(1, [Validators.required, Validators.min(1)]);

    this.fromControl.valueChanges.subscribe( () => {
      this.rate = null;
      this.result = null;
    });

    this.toControl.valueChanges.subscribe( () => {
      this.rate = null;
      this.result = null;
    });

    this.amountControl.valueChanges.subscribe( () => {
      if (this.rate)
        this.result = this.amountControl.value * this.rate;
    });
    
    this.apiService.getListQuote().subscribe( data => {
        this.listQuotes = data;
      }
    );
  }

  onCalculateClick() {
    if (this.amountControl.invalid || this.fromControl.invalid || this.toControl.invalid) {
      this.amountControl.markAsDirty();
      this.fromControl.markAsDirty();
      this.toControl.markAsDirty();
      return;
    } 

    this.apiService.getExhange(this.fromControl.value, this.toControl.value).subscribe(result => {
      this.rate = result;
      this.result = this.amountControl.value * result;
    });
  }
}
