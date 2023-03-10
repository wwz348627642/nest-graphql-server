import { InputType } from '@nestjs/graphql';
import { DateForm } from 'src/common/dateForm.request';

@InputType()
export class UvForm extends DateForm {}
