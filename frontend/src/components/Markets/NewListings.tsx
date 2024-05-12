import colors from "../../constants/colors";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Listing from "./Listing";
import NewsList from "./NewsList";
import NewsListLoading from "./NewsListLoading";

const AssetContainer = styled.div`
  max-width: 336px;

  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ListingsContainer = styled.div`
  background: ${colors.white};
  border-radius: 10px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TitleText = styled.div`
  color: ${colors.dark};
  font-weight: bold;
  font-size: 18px;
`;

const NEWS_DATA = [
  {
    img: "./assets/img/news.png",
    category: "Blockchain",
    date: "Feb 22 2024",
    article:
      "Protocol Village: Research Paper Details 'Snarktor,' Featuring 'Recursive Proof Aggregation'",
  },

  {
    img: "./assets/img/news1.png",
    category: "Blockchain",
    date: "Feb 22 2024",
    article:
      "Judge Signs Off on Binance's $4.3B Plea Deal With U.S. Prosecutors",
  },

  {
    img: "./assets/img/news2.png",
    category: "Markets",
    date: "Feb 22 2024",
    article:
      "Uniswap's UNI Jumps 60% on Proposal to Reward Token Holders in Major Governance Overhaul",
  },

  {
    img: "./assets/img/news3.png",
    category: "Technology",
    date: "Feb 22 2024",
    article:
      "Satoshi Anticipated Bitcoin Energy Debate in Email Thread With Early Collaborators",
  },

  {
    img: "./assets/img/news4.png",
    category: "Finance",
    date: "Feb 22 2024",
    article: "Reddit Discloses Bitcoin and Ether Holdings in IPO Filing",
  },
];

interface NewListingsProps {
  data: any;
}

const NewListings: React.FC<NewListingsProps> = ({ data }) => {
  const [newsLoading, setNewsLoading] = useState(true);
  const [newListLoading, setNewListLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setNewsLoading(false);
      setNewListLoading(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <AssetContainer>
      <ListingsContainer className="dark:bg-darkSecondary">
        <TitleText className="dark:text-darkText">Latest News</TitleText>
        {newsLoading ? (
          <NewsListLoading />
        ) : (
          NEWS_DATA.map((item, index) => (
            <NewsList
              isLast={index === NEWS_DATA.length - 1}
              key={index}
              data={item}
            />
          ))
        )}
      </ListingsContainer>
      <ListingsContainer className="dark:bg-darkSecondary">
        <TitleText className="dark:text-darkText">New Listings</TitleText>

        {newListLoading ? (
          <NewsListLoading newListings />
        ) : (
          data.map((item: any, index: number) => (
            <Listing
              isLast={index === data.length - 1}
              key={index}
              data={item}
            />
          ))
        )}
      </ListingsContainer>
    </AssetContainer>
  );
};

export default NewListings;
