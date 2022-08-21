import { Component, OnInit } from '@angular/core';
import {IContact} from "../../models/IContact";
import {IGroup} from "../../models/IGroup";
import {ActivatedRoute, Router} from "@angular/router";
import {ContactService} from "../../services/contact.service";

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
  public loading: boolean = false;
  public contactID: string | null = null;
  public contact: IContact = {} as IContact;
  public errorMessage: string | null = null;
  public groups: IGroup[] = [] as IGroup[];

  constructor(private activatedRoute: ActivatedRoute,
              private contactService : ContactService,
              private router : Router) {

  }

  ngOnInit(): void {
    this.loading = true;
    this.activatedRoute.paramMap.subscribe((param) =>{
      this.contactID = param.get('contactID');
    });
    if (this.contactID){
this.contactService.getContact(this.contactID).subscribe((data)=>{
  this.contact = data;
  this.loading = false;
  this.contactService.getAllGroups().subscribe((data) =>{
    this.groups = data;
  });
}, (error) =>{
  this.errorMessage = error;
  this.loading = false;
})
    }
  }
 public submitUpdate(){
   if (this.contactID){
     this.contactService.updateContact(this.contact, this.contactID).subscribe((data) => {
         this.router.navigate(['/']).then();
       },(error) => {
         this.errorMessage = error;
         this.router.navigate([`/contacts/edit${this.contactID}`]).then();
       });
   }
 }
}
