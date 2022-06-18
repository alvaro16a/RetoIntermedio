import { VerificacionComponent } from './persona/verificacion/verificacion.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnswerComponent } from './paginas/answer/answer.component';
import { QuestionComponent } from './paginas/question/question.component';
import { RequestionComponent } from './paginas/requestion/requestion.component';
import { LoginComponent } from './persona/login/login.component';
import { PreguntasComponent } from './persona/preguntas/preguntas.component';
import { RegistroComponent } from './persona/registro/registro.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'preguntas', component: PreguntasComponent},
  { path: 'registro', component: RegistroComponent},
  { path: 'verificar-correo', component: VerificacionComponent},
  { path: 'answer', component: AnswerComponent},
  {path: 'question/:id', component: RequestionComponent},
  {path: '**', pathMatch: 'full', redirectTo:'preguntas'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



