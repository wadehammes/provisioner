#!/bin/bash

# generate boilerplate component content
create_component_file() {
  touch "$component_name.component.tsx"
  {
    echo 'import classNames from "classnames";'
    echo 'import type { HTMLAttributes } from "react";'
    echo "import styles from \"src/components/${component_name}/${component_name}.module.css\";"
    echo
    echo "interface ${component_name}Props extends HTMLAttributes<HTMLDivElement> {}"
    echo
    echo "export const ${component_name} = (props: ${component_name}Props) => {"
    echo "  const { children, className, ...restProps } = props;"
    echo
    echo "  return ("
    echo "    <div"
    echo "      {...restProps}"
    echo "      className={classNames(styles.root, className)}"
    echo "      data-testid=\"wh${component_name}\""
    echo "    >"
    echo "      {children}"
    echo "    </div>"
    echo "  );"
    echo "};"
  } >> "$component_name.component.tsx"
}

create_module_css_file() {
  touch "$component_name.module.css"
  {
    echo ".root {"
    echo "}"
  } >> "$component_name.module.css"
}

# generate boilerplate spec content
create_spec_file() {
  touch "$component_name.spec.tsx"
  {
    echo 'import { render, screen, waitFor } from "test-utils";'
    echo "import { ${component_name} } from \"src/components/${component_name}/${component_name}.component\";"
    echo
    echo "const testId = \"wh${component_name}\""
    echo
    echo "describe(\"${component_name}\", () => {"
    echo "  it(\"renders ${component_name}\", async () => {"
    echo "    render(<${component_name} />);"
    echo
    echo "    const component = await screen.findByTestId(testId);"
    echo
    echo "    await waitFor(() => {"
    echo "      expect(component).toBeVisible();"
    echo "    });"
    echo "  });"
    echo "});"
  } >> "$component_name.spec.tsx"
}

# Absolute path this script is in, thus /home/user/bin
script_pwd=$(dirname "$BASH_SOURCE")

component_name=$1

if [ "$component_name" = "" ]; then
  echo "Error: Component name not provided - you must provide a valid app name followed by the name of the component"
  echo "ex: scaffold_component <component_name>"
  exit 1
fi

dir="./src/components/$component_name"

if [ ! -d $dir ]; then
  mkdir "$dir"
  pushd $dir > /dev/null
  create_component_file
  create_module_css_file
  create_spec_file
  popd > /dev/null
  echo "✨Successfully scaffolded ${component_name}✨"
  echo "Head over to src/components/$component_name to start building"
  echo "Happy hacking 😁"
  exit 0
else
  echo "Error: $component_name already exists. Aborting scaffolding."
  exit 1
fi
