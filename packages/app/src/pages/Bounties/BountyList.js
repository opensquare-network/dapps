import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBounties, bountiesSelector } from "../../store/reducers/explorerSlice";
import EmptyBounty from "@pages/Bounties/EmptyBounty";
import styled from "styled-components";
import Container from "@components/Container";
import Card from "@components/Card";
import DateShow from "@components/DateShow";
import HexText from "@components/HexText";
import Balance from "@components/Balance";
import { NavLink } from "react-router-dom";
import { Pagination } from 'antd';

const Wrapper = styled(Container)`
  & > main {
  }
  margin-top: 26px;

  & > main > div {
    min-height: 120px;
  }
`

const BountyItem = styled(Card)`
  margin-bottom: 10px;

  .title {
    margin-bottom: 10px;
    font-size: 16px;
    font-weight: bold;
  }

  & > div.info {
    display: flex;

    & > div.item {
      margin-right: 20px;
      flex: 1;
      flex-grow: 0;
      white-space: nowrap;

      display: flex;

      & > div {
        margin-right: 5px;
        flex: 1;
        flex-grow: 0;
        white-space: nowrap;
      }
    }
  }
`

export default function BountyList() {
  const [tablePage, setTablePage] = useState(1)
  const [tablePageSize, setTablePageSize] = useState(5)
  const dispatch = useDispatch()

  useEffect(() => {
    // Add state filter to get bounties in specific stage
    // dispatch(fetchBounties({ state: 'Accepted' }, 0, 20))
    dispatch(fetchBounties({}, tablePage - 1, tablePageSize))
  }, [dispatch, tablePage, tablePageSize])

  const { items: bounties, page, pageSize, total } = useSelector(bountiesSelector)
  if (bounties.length <= 0) {
    return <EmptyBounty />
  }

  return (
    <Wrapper>
      { bounties.map(item =>
        <BountyItem key={item.bountyId}>
          <NavLink to={`/bounty/${item.bountyId}`}>
            <HexText className="title" value={item.meta.V1.title} />
          </NavLink>
          <div className="info">
            <div className="item">
              <div>{item.hunters?.hunters?.length || 0}</div>
              <div>Applicants</div>
            </div>

            <div className="item">
              <DateShow value={item.indexer.blockTime} />
              <div>Created</div>
            </div>

            <Balance value={item.meta.V1.payment} />
          </div>
        </BountyItem>
      )}

      <Pagination
        defaultCurrent={page}
        pageSize={pageSize}
        total={total}
        onChange={(page, pageSize) => {
          setTablePage(page)
          setTablePageSize(pageSize)
        }}
        />
    </Wrapper>
  )
}
