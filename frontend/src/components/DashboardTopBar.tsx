import React, { useEffect, useState } from "react";
import { Box, Header, ResponsiveContext, Image } from "grommet";
import { Menu } from "grommet-icons";

import styled from "styled-components";

import { Nav, NavContainer, NavWrapper } from "./style";

import { NavLink, useNavigate } from "react-router-dom";

import { Badge, Button, CustomToast, ToggleButton } from "./Wrapped";
import Notifier from "./Wrapped/Notifier";
import colors from "../constants/colors";
import Dropdown from "./Wrapped/DropDown";
import { useDispatch, useSelector } from "react-redux";

import useAuth from "../hooks/useAuth";
import { SignInModal } from "./Auth";
import { setLoggedIn, setWalletAddress, setSafeAddress } from "../redux/reducers";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import useWallet from "../hooks/useWallet";
import { shortenWalletAddress } from "../utils";
import Capsule, {
  Environment,
  CapsuleModal,
} from '@usecapsule/react-sdk';
import { capsule } from "../connector/capsule";


const CHAINS = [
  { label: "Spot", icon: "spot" },
  { label: "Convert", icon: "swap", badge: "Coming soon" },
  { label: "Futures", icon: "futures", badge: "Coming soon" },
  { label: "Margin", icon: "margin", badge: "Coming soon" },
];

const PROFILE_LINKS = [
  { label: "Profile", icon: "profile" },
  { label: "Settings", icon: "settings" },
  { label: "Security", icon: "security" },
  { label: "Sub Accounts", icon: "subaccounts" },
];

const CURRENCY = [{ label: "BTC" }, { label: "ETH" }, { label: "USDT" }];

const NavItem = styled.div`
  padding: 4px;
  cursor: pointer;
`;

const NavLinkItem = styled(NavLink)`
  color: ${colors.gray};
  &:hover {
    color: ${colors.dark};
  }
`;

interface DashboardTopBarProps {
  theme: string;
  switchTheme: () => void;
}

const DashboardTopBar: React.FC<DashboardTopBarProps> = ({
  theme,
  switchTheme,
}) => {
  const { connect, connectors, } = useConnect();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect()

  const [isOpen, setIsOpen] = useState(false);

  const { walletAddress, loggedIn } = useSelector((state: any) => {
    const { walletAddress, loggedIn } = state.webAppReducer;
    return { walletAddress, loggedIn };
  });

  const [walletId, setWalletId] = useState<string | undefined>(undefined);

  const [openSigninModal, setOpenSigninModal] = useState(false);
  const [connecting, setConnecting] = useState(false);

  const [nav, setNav] = useState("");
  const [profileNav, setProfileNav] = useState("");
  const [currency, setCurrency] = useState("BTC");
  const dispatch = useDispatch();
  const { loginUser } = useAuth();
  const { generateDepositAddress } = useWallet();

  const navigate = useNavigate();

  const handleNavSelect = (item: string) => {
    setNav(item);
    navigate("/trade");
  };

  const handleProfileNavSelect = (item: string) => {
    setProfileNav(item);

    if (item.toLowerCase() === "settings") {
      navigate("/settings");
    }
  };

  const handleCurrencySelect = (item: string) => {
    setCurrency(item);
  };

  const handleNotificationsTrigger = () => {
    navigate("/notifications");
  };
  console.log({ connectors })

  const handleConnection = () => {

    const walletConnector = connectors?.find(x => x.id === "capsule");
    if (walletConnector) {
      connect({ connector: walletConnector })
      setIsOpen(true);
    }
  };

  const updateLoginStatus = async () => {
    setConnecting(true);

    dispatch(setLoggedIn(isConnected));
    dispatch(setWalletAddress(address || ""));

    setConnecting(false);

  };

  useEffect(() => {
    updateLoginStatus();
  }, [address, isConnected]);

  useEffect(() => {
    if (loggedIn) {
      loginUser(
        process.env.REACT_APP_TEST_EMAIL || "",
        process.env.REACT_APP_TEST_PASSWORD || ""
      );
      CustomToast("Account Connected", "success");
    }
  }, [loggedIn]);

  useEffect(() => {
    (async () => {
      try {
        if (!address) return;
        const response = await generateDepositAddress(address);
        dispatch(setSafeAddress(response?.safeAddress));
      } catch (error) {
        console.log(error)
      }
    })()
  }, [address]);

  return (
    <ResponsiveContext.Consumer>
      {(size) => (
        <Header
          className="mb-6"
          pad={{ top: "medium", left: "2rem", right: "2rem" }}
        >
          {openSigninModal && (
            <SignInModal onClose={() => setOpenSigninModal(false)} />
          )}

          {/* <CapsuleModal capsule={capsule} isOpen={isOpen} onClose={() => { setIsOpen(false) }} /> */}

          <Box direction="row" align="center" gap="small" width="10rem">
            {theme === "dark" ? (
              <Image fit="cover" src="../../assets/img/logoDark.png" />
            ) : (
              <Image fit="cover" src="../../assets/img/logo.png" />
            )}
          </Box>
          {size === "small" ? (
            <Box>
              <Menu color="white" />
            </Box>
          ) : (
            <NavContainer direction="row" gap="medium">
              <NavWrapper>
                <NavItem>
                  <NavLinkItem
                    className="dark:text-[#BDBDBD] dark:hover:text-white"
                    to="/"
                  >
                    Dashboard
                  </NavLinkItem>
                </NavItem>
                <NavItem>
                  <NavLinkItem
                    className="dark:text-[#BDBDBD] dark:hover:text-white"
                    to="/markets"
                  >
                    Markets
                  </NavLinkItem>
                </NavItem>

                <NavItem>
                  <NavLinkItem
                    className="dark:text-[#BDBDBD] dark:hover:text-white"
                    to="/wallet"
                  >
                    Wallet
                  </NavLinkItem>
                </NavItem>

                <Dropdown
                  borderless
                  label={"Trade"}
                  children={CHAINS}
                  onSelect={handleNavSelect}
                />

                <NavItem>
                  <NavLinkItem
                    className="dark:text-[#BDBDBD] dark:hover:text-white"
                    to="#"
                  >
                    Orders
                  </NavLinkItem>
                </NavItem>
                <NavItem>
                  <NavLinkItem
                    className="dark:text-[#BDBDBD] dark:hover:text-white"
                    to="#"
                  >
                    <Nav className="relative">
                      Earn{" "}
                      <div className="mb-2">
                        <Badge version={2} label={"Coming soon"} />
                      </div>
                    </Nav>
                  </NavLinkItem>
                </NavItem>
              </NavWrapper>

              <NavWrapper>
                {loggedIn && (
                  <div className="py-1 px-4 border border-tertiary dark:border-darkBg rounded-xl text-dark dark:text-darkText">
                    {shortenWalletAddress(walletAddress)}
                  </div>
                )}
                <Dropdown
                  borderless
                  label={currency}
                  children={CURRENCY}
                  onSelect={handleCurrencySelect}
                />

                <div className="w-12">
                  <ToggleButton onClick={switchTheme} theme={theme} />
                </div>

                <Notifier onClick={handleNotificationsTrigger} />

                {loggedIn ? (
                  <Dropdown
                    borderless
                    menu
                    label={"demoUser24"}
                    children={PROFILE_LINKS}
                    onSelect={handleProfileNavSelect}
                  />
                ) : (
                  <Button
                    onClick={async () => {
                      if (loggedIn) {
                        disconnect()
                        setLoggedIn(false);
                      } else {
                        handleConnection()
                      }
                    }}
                    label="Connect"
                  />
                )}

                {/* <Button
                  onClick={() => setOpenSigninModal(true)}
                  label="Log In"
                /> */}
              </NavWrapper>
            </NavContainer>
          )}
        </Header>
      )}
    </ResponsiveContext.Consumer>
  );
};

export default DashboardTopBar;
