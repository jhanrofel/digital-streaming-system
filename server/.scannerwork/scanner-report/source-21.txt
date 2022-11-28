import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {MySequence} from './sequence';
import {AuthenticationComponent} from '@loopback/authentication';
import {
  JWTAuthenticationComponent,
  UserServiceBindings,
  TokenServiceBindings,
  RefreshTokenServiceBindings,
} from '@loopback/authentication-jwt';
import {MongoDbDataSource} from './datasources/mongo-db.datasource';
import {CustomUserService} from './services/user.service';
import {UsersRepository, UserCredentialsRepository} from './repositories';
import {
  AuthorizationOptions,
  AuthorizationDecision,
  AuthorizationComponent,
  AuthorizationTags,
} from '@loopback/authorization';
import {MyAuthorizationProvider} from './authorization';

export {ApplicationConfig};

export class DigitalStreamingSystemApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };

    // Mount authentication system
    this.component(AuthenticationComponent);
    // Mount jwt component
    this.component(JWTAuthenticationComponent);
    // Bind datasource
    this.dataSource(MongoDbDataSource, UserServiceBindings.DATASOURCE_NAME);
    //Bind datasource for refreshtoken table
    this.dataSource(
      MongoDbDataSource,
      RefreshTokenServiceBindings.DATASOURCE_NAME,
    );

    // Bind user service
    this.bind(UserServiceBindings.USER_SERVICE).toClass(CustomUserService);
    // Bind user and credentials repository
    this.bind(UserServiceBindings.USER_REPOSITORY).toClass(UsersRepository);
    this.bind(UserServiceBindings.USER_CREDENTIALS_REPOSITORY).toClass(
      UserCredentialsRepository,
    );

    const optionsAuth: AuthorizationOptions = {
      precedence: AuthorizationDecision.DENY,
      defaultDecision: AuthorizationDecision.DENY,
    };

    const binding = this.component(AuthorizationComponent);
    this.configure(binding.key).to(optionsAuth);

    this.bind('authorizationProviders.my-authorizer-provider')
      .toProvider(MyAuthorizationProvider)
      .tag(AuthorizationTags.AUTHORIZER);

    this.bind(TokenServiceBindings.TOKEN_EXPIRES_IN).to('30');
    this.bind(RefreshTokenServiceBindings.REFRESH_EXPIRES_IN).to('1000000');
  }
}
