import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ContactService} from "../../services/contact.service";
import {IContact} from "../../models/IContact";
import {IGroup} from "../../models/IGroup";

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.css']
})
export class ViewContactComponent implements OnInit {
public loading:boolean = false;
  public contactId: string | null = null;
public contact: IContact = {} as IContact;
public errorMessage: string | null = null;
public group:IGroup = {} as IGroup;

  constructor(private activatedRote : ActivatedRoute,
              private contactsService: ContactService) { }

  ngOnInit(): void {
    this.activatedRote.paramMap.subscribe((param) => {
this.contactId = param.get('contactId');
      });
    if (this.contactId){
      this.contactsService.getContact(this.contactId).subscribe((data) => {
        this.contact = data;
        this.loading = false;
        this.contactsService.getGroup(data).subscribe((data) => {
          this.group = data;
        });
      },(error) =>{
        this.errorMessage = error;
        this.loading = false;
      });
    }

  }

  public isNotEmpty(){
    return Object.keys(this.contact).length > 0 && Object.keys(this.group).length >0;
  }
}
