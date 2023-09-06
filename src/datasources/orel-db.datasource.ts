import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'orelDB',
  connector: 'postgresql',
  url: '',
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: '1234',
  database: 'repeatword'
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class OrelDbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'orelDB';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.orelDB', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
