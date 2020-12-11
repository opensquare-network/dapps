import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPendingApproveBounties, pendingApproveBountiesSelector } from "../../store/reducers/councilorSlice";
import Empty from "@components/Empty";
import styled from "styled-components";
import Container from "@components/Container";
import BountyList from "../../components/BountyList";

import Pagination from "@components/Pagination";

const Wrapper = styled(Container)`
  & > main {
  }
  margin-top: 26px;
`

const EmptyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;

  & > span {
    margin-top: 10px;
  }
`


export default function PendingApproveBounties() {
  const [tablePage, setTablePage] = useState(1)
  const [tablePageSize, setTablePageSize] = useState(10)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPendingApproveBounties(tablePage - 1, tablePageSize))
  }, [dispatch, tablePage, tablePageSize])

  const { items: bounties, page, pageSize, total } = useSelector(pendingApproveBountiesSelector)
  const tablePageTotal = Math.ceil(total / pageSize);

  if (bounties.length <= 0) {
    return (
      <EmptyWrapper>
        <Empty>No Bounties</Empty>
      </EmptyWrapper>
    )
  }

  return (
    <Wrapper>
      <BountyList bounties={bounties} councilor={true} />
      <Pagination
        boundaryRange={0}
        defaultActivePage={page || 1}
        ellipsisItem={null}
        firstItem={null}
        lastItem={null}
        siblingRange={1}
        totalPages={tablePageTotal}
        onPageChange={(_, data) => {
          setTablePage(data.activePage);
          setTablePageSize(pageSize)
        }}
      />
    </Wrapper>
  )
}
