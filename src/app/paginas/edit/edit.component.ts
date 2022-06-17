import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { answe } from 'src/app/models/answe';
import { AnswerI } from 'src/app/models/answer-i';
import { QuestionI } from 'src/app/models/question-i';
import { QuestionService } from 'src/app/Service/question.service';
import { ServiceService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [MessageService],
})
export class EditComponent implements OnInit {
  @Input() question2: QuestionI[] | undefined;
  userLogged = this.authService.getUserLogged();
  answers: AnswerI[] | undefined;
  @Input() idanswer: any='';
  question: answe = {
    id:'',
    userId:'',
    question: '',
    type: '',
    category: '',
    answers:[null],
    start: '2'
  };

  constructor(
    private modalService: NgbModal,
    public authService: ServiceService,
    private services: QuestionService,
    private toastr: ToastrService,
    private route: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getData();
    this.getDatos();
  }

  getDatos(){
    this.question=this.idanswer;
  }
  

  openVerticallyCentered(content: any) {
    this.modalService.open(content, { centered: true });
  }

  getData(){    
    this.userLogged.subscribe(value=>{
    })
    
  }


  editQuestion(question: QuestionI): void{
     question.id=this.idanswer.id;
    question.userId=this.idanswer.userId;

    this.services.editQuestion(question).subscribe((v)=>{
     
    });

    this.modalService.dismissAll();
    this.messageService.add({
      severity: 'success',
      summary: 'Se ha actualizado la pregunta',          
     });
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }

  saveQuestion(question: QuestionI): void {
    if(question.type && question.category){    
     this.modalService.dismissAll();
     this.services.saveQuestion(question).subscribe({
       next: (v) => {       
         if (v) {
           this.messageService.add({
             severity: 'success',
             summary: 'Se ha agregado la pregunta',
             
            });
            setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          
        }
      },
      error: (e) =>
      this.toastr.error(e.mesaje, 'Fail', {
        timeOut: 3000,
      }),
      complete: () => console.info('complete'),
    });
  }else{
   
    this.messageService.add({
      severity: 'error',
      summary: 'Rectifique los datos',
      detail: '(Campos Vacios)-Intente de Nuevo',
    });
  }
  }
}
