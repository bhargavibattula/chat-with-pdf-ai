import pkgutil
import langchain
print(f"Langchain version: {langchain.__version__}")
print("Submodules:")
for loader, module_name, is_pkg in pkgutil.walk_packages(langchain.__path__, langchain.__name__ + "."):
    print(module_name)
