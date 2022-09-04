## Core
```
ng generate module core
```

### core/color-palettes
```
ng generate service core/color-palettes/color-palettes --skipTests=true
```

### core/layouts
```
ng generate service core/layouts/layouts --skipTests=true
```

These must be entry-components because they are used in dynamic routes
```
ng generate component core/layouts/option-a/option-a-layout --module=core/core --skipTests=true --export=true --flat=true --entryComponent=true

ng generate component core/layouts/option-b/option-b-layout --module=core/core --skipTests=true --export=true --flat=true --entryComponent=true

ng generate component core/layouts/option-c/option-c-layout --module=core/core --skipTests=true --export=true --flat=true --entryComponent=true

ng generate component core/layouts/option-d/option-d-layout --module=core/core --skipTests=true --export=true --flat=true --entryComponent=true

ng generate component core/layouts/empty/empty-layout --module=core/core --skipTests=true --export=true --flat=true --entryComponent=true

ng generate component core/layouts/mobile/mobile-layout --module=core/core --skipTests=true --export=true --flat=true --entryComponent=true

ng generate component core/layouts/dynamic/dynamic-layout --module=core/core --skipTests=true --export=true --flat=true --entryComponent=true
```

### core/top-navbar
```
ng generate component core/top-navbar --module=core/core --skipTests=true --export=true
```

### core/side-navbar
```
ng generate component core/side-navbar --module=core/core --skipTests=true --export=true
```

### core/side-menus
```
ng generate service core/side-menus/side-menus --skipTests=true
```

#### side-menus/main-menu
```
ng generate component core/side-menus/main-menu --module=core/core --skipTests=true --export=true
```

#### side-menus/dynamic-menu
```
ng generate component core/side-menus/dynamic-menu --module=core/core --skipTests=true --export=true
```

<!-- These need to be entryComponents because they will be used for Angular Material CDK Portals -->
#### side-menus/notifications-menu
```
ng generate component core/side-menus/notifications-menu --module=core/core --skipTests=true --export=true --entryComponent=true
```

#### side-menus/settings-menu
```
ng generate component core/side-menus/settings-menu --module=core/core --skipTests=true --export=true --entryComponent=true
```

#### side-menus/search-menu
```
ng generate component core/side-menus/search-menu --module=core/core --skipTests=true --export=true --entryComponent=true
```
