import { Routes, RouterModule } from '@angular/router';
import { EditarRendimentosComponent } from './editar-rendimento.component';

const routes: Routes = [
  {
    path: 'editar-avaliacao/:id',
    component: EditarRendimentosComponent
  },
];

export const EditarRendimentoRoutes = RouterModule.forChild(routes);
