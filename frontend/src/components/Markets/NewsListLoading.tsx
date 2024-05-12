import React from "react";
import Skeleton from "react-loading-skeleton";
import styled from "styled-components";

const ListingSkeletonWrapper = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const ListingSkeletonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const SkeletonPriceWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

interface NewsListLoadingProps {
  newListings?: any;
}

const NewsListLoading: React.FC<NewsListLoadingProps> = ({ newListings }) => {
  if (newListings) {
    return (
      <ListingSkeletonContainer>
        <ListingSkeletonWrapper>
          <Skeleton width={70} height={70} circle />
          <SkeletonPriceWrapper>
            <Skeleton width={100} height={30} />
            <Skeleton width={100} height={30} />
          </SkeletonPriceWrapper>
        </ListingSkeletonWrapper>

        <ListingSkeletonWrapper>
          <Skeleton width={70} height={70} circle />
          <SkeletonPriceWrapper>
            <Skeleton width={100} height={30} />
            <Skeleton width={100} height={30} />
          </SkeletonPriceWrapper>
        </ListingSkeletonWrapper>

        <ListingSkeletonWrapper>
          <Skeleton width={70} height={70} circle />
          <SkeletonPriceWrapper>
            <Skeleton width={100} height={30} />
            <Skeleton width={100} height={30} />
          </SkeletonPriceWrapper>
        </ListingSkeletonWrapper>
      </ListingSkeletonContainer>
    );
  }
  return (
    <ListingSkeletonContainer>
      <ListingSkeletonWrapper>
        <Skeleton width={70} height={70} />
        <div>
          <Skeleton width={220} height={30} />
          <Skeleton width={220} height={30} />
        </div>
      </ListingSkeletonWrapper>

      <ListingSkeletonWrapper>
        <Skeleton width={70} height={70} />
        <div>
          <Skeleton width={220} height={30} />
          <Skeleton width={220} height={30} />
        </div>
      </ListingSkeletonWrapper>

      <ListingSkeletonWrapper>
        <Skeleton width={70} height={70} />
        <div>
          <Skeleton width={220} height={30} />
          <Skeleton width={220} height={30} />
        </div>
      </ListingSkeletonWrapper>
    </ListingSkeletonContainer>
  );
};

export default NewsListLoading;
