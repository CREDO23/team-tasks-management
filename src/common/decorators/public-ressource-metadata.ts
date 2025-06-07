import { SetMetadata } from '@nestjs/common';

export const PUBLIC_RESOURCE_METADATA_KEY = 'publicResource';

export const PublicResource = () =>
  SetMetadata(PUBLIC_RESOURCE_METADATA_KEY, true);
