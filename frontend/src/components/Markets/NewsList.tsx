import React from "react";
import styled from "styled-components";
import { Divider } from "../../components/Wrapped";
import colors from "../../constants/colors";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const NewsListContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`;

const ImgWrapper = styled.div`
  min-width: 60px;
  height: 60px;
  border-radius: 10px;
  overflow: hidden;
`;

const NewsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TitleText = styled.div`
  font-size: 12px;
  font-weight: 800;
  color: ${colors.primary};
`;

const DateText = styled.div`
  font-size: 12px;
  color: ${colors.grayLight};
`;

const ArticleText = styled.div`
  font-size: 13px;
  color: ${colors.dark};
  line-height: 0.8rem;
`;

interface NewsListProps {
  data: any;
  isLast: boolean;
}

const NewsList: React.FC<NewsListProps> = ({ data, isLast }) => {
  return (
    <Container>
      <NewsListContainer>
        <ImgWrapper>
          <img
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            src={data.img}
            alt="news"
          />
        </ImgWrapper>
        <NewsWrapper>
          <TitleWrapper>
            <TitleText>{data.category}</TitleText>
            <DateText>{data.date}</DateText>
          </TitleWrapper>
          <ArticleText className="dark:text-darkText">
            {data.article}
          </ArticleText>
        </NewsWrapper>
      </NewsListContainer>
      {!isLast && <Divider />}
    </Container>
  );
};

export default NewsList;
