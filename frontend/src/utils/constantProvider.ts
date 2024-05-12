class ConstantProvider {
  static clientId: string = process.env.REACT_APP_WEBAUTH_CLIEND_ID as string;
  static PLATFORM_PRIV_KEY: string = process.env.REACT_APP_PLATFORM_PRIV_KEY as string;
  static NETWORK_CHAIN_ID: number = Number(process.env.REACT_APP_PPROJECT_NETWORK_ID);
  static RPC_PROVIDER: string = process.env.REACT_APP_RPC_PROVIDER as string;
  static BACKEND_URL: string = process.env.REACT_APP_BACKEND_URL as string;
  static appName: string = "Maroon POC";
  static safeModule: string = process.env.REACT_APP_SAFE_MODULE as string;
  static SAFE_4337_MODULE_ADDRESS = process.env.REACT_APP_SAFE_4337_MODULE_ADDRESS as string;
  static ADD_MODULES_LIB_ADDRESS = process.env.REACT_APP_ADD_MODULES_LIB_ADDRESS as string;
  static ENTRY_POINT_ADDRESS = process.env.REACT_APP_ENTRY_POINT_ADDRESS as string;
  static SAFE_SINGLETON_ADDRESS = process.env.REACT_APP_SAFE_SINGLETON_ADDRESS as string;
  static SAFE_PROXY_FACTORY_ADDRESS = process.env.REACT_APP_SAFE_PROXY_FACTORY_ADDRESS as string;
}

export default ConstantProvider;
