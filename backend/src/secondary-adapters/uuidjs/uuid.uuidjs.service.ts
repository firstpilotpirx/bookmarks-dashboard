import { UuidService } from '../../core/bookmark/services/uuid.service';
import { v4 as uuidv4 } from 'uuid';

export class UuidUuidjsService implements UuidService {
  generate(): string {
    return uuidv4();
  }
}
