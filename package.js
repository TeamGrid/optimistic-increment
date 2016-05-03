Package.describe({
  name: 'teamgrid:optimistic-increment',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Reactively increment values with a better user experience',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/TeamGrid/optimistic-increment.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.2.1');
  api.use([
    'ecmascript',
    'check',
    'tracker',
    'teamgrid:reactive-interval@1.0.0',
  ], 'client');
  api.mainModule('optimistic-increment.js', 'client');
});