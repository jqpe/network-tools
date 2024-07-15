# network-tools

## Overview

This is a React app based on Tanstack Router, using Vite as the bundler. Shadcn UI for user interface components and Tailwind.css for styling. Mostly written in TypeScript. Large lists are virtualized with @tanstack/react-virtual. Uses Cloudflare workers for server-side functionality.

To test pages functions locally run `pnpm preview`

```sh
src
├── components  # reusable components
├── routes      # routes
├── services    # network logic
├── types       # typescript interfaces
```

## License

Copyright (C) 2024 Jasper Nykänen
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
