import 'react-testing-library/cleanup-after-each';
import 'jest-dom/extend-expect';
import * as emotion from 'react-emotion';
import { createSerializer, createMatchers } from 'jest-emotion';

expect.addSnapshotSerializer(createSerializer(emotion));
expect.extend(createMatchers(emotion));
