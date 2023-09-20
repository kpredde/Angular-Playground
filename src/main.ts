import 'zone.js/dist/zone';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { z } from 'zod';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'app-main.html',
})
export class App {
  name = () => {
    const AccountSchema = z.object({
      id: z.number(),
      code: z.string(),
      date: z.date(),
    });
    type IAccount = z.infer<typeof AccountSchema>;
    const myDemoAccount: IAccount = {
      id: 1,
      code: 'demo',
      date: new Date(),
    };
    const account = AccountSchema.safeParse(myDemoAccount);
    if (account.success) {
      return account.data;
    } else {
      return account.error.message;
    }
  };
}

bootstrapApplication(App);
