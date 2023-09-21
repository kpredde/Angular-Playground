import 'zone.js/dist/zone';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { z, ZodError } from 'zod';

const AccountSchema = z.object({
  id: z.number(),
  code: z.string().nonempty(),
  date: z.date(),
  isAcitve: z.boolean(),
});
type IAccount = z.infer<typeof AccountSchema>;

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'app-main.html',
})
export class App {
  myObject = (): IAccount | ZodError => {
    const myDemoAccount: IAccount = {
      id: 1,
      code: 'Demo',
      date: new Date(),
      isAcitve: true,
    };
    const account = AccountSchema.safeParse(myDemoAccount);
    if (account.success) {
      return account.data;
    } else {
      return account.error;
    }
  };
}

bootstrapApplication(App);
