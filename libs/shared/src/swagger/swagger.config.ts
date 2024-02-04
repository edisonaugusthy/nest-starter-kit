/**
 * Swagger UI Config
 */
interface SwaggerConfig {
  title: string;
  description: string;
  version: string;
  tags: string[];
}

export const SWAGGER_CONFIG: SwaggerConfig = {
  title: 'Nest Started with DDD',
  description: 'Your Description goes here',
  version: '1.0.0',
  tags: [],
};
