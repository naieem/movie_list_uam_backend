import { SetMetadata } from '@nestjs/common';

export const IsPublic = (isPublic: boolean) => {
  return SetMetadata('isPublic', isPublic);
};
