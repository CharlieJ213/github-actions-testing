import { init as initApm } from '@elastic/apm-rum'

const apm = initApm({
  serviceName: 'react-app',
  serverUrl: 'http://localhost:8200',
  serviceVersion: '1.0.0',
  environment: 'production'
})

export default apm
