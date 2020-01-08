import allModules from "@/store/modules";
import store from "@/store";

export default function dispatchActionForAllModules(
  actionName: string,
  config: any = {}
) {
  const modules = config.modules ? config.modules : allModules;
  const modulePrefix = config.modulePrefix ? config.modulePrefix : "";

  for (const moduleName in modules) {
    const moduleDefinition: any = modules[moduleName];
    if (moduleDefinition && moduleDefinition.Init) {
      store.dispatch(`${modulePrefix}${moduleName}/${actionName}`);
    }

    // If there are any nested sub-modules...
    if (moduleDefinition.modules) {
      // Also dispatch the action for these sub-modules.
      dispatchActionForAllModules(actionName, {
        modules: moduleDefinition.modules,
        modulePrefix: modulePrefix + moduleName + "/"
      });
    }
  }
}
