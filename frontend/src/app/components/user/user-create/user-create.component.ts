import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  user: User = {
    name: 'Elomar END',
    age: 33
  }

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  createUser(): void {

    this.userService.create(this.user).subscribe(() => {
      this.userService.showMessage('Usuário cadastrado com sucesso')

      this.router.navigate(['/users'])
    })
  }

  cancelUser(): void {
    this.router.navigate(['/users'])
  }
}
