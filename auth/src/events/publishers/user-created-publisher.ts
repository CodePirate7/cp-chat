import { Publisher } from "../base-publisher";
import { Subjects } from "../subjects";
import { UserCreatedEvent } from "./../user-created-event";

export class UserCreatedPublisher extends Publisher<UserCreatedEvent> {
  subject: Subjects.UserCreated = Subjects.UserCreated;
}
