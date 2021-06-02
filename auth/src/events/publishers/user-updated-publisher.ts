import { UserUpdatedEvent } from "./../user-updated-event";
import { Publisher } from "../base-publisher";
import { Subjects } from "../subjects";

export class UserUpdatedPublisher extends Publisher<UserUpdatedEvent> {
  subject: Subjects.UserUpdated = Subjects.UserUpdated;
}
