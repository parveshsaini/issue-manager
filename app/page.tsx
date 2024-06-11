import IssueChart from "@/components/IssueChart";
import IssueSummmary from "@/components/IssueSummmary";
import LatestIssues from "@/components/LatestIssues";
import Pagination from "@/components/Pagination";
import prisma from "@/prisma/client";
import { Metadata } from "next";
import Image from "next/image";

export default async function Home() {

  const openIssues= await prisma.issue.count({where: {status: 'OPEN'}})
  const closedIssues= await prisma.issue.count({where: {status: 'CLOSED'}})
  const inProgressIssues= await prisma.issue.count({where: {status: 'IN_PROGRESS'}})

  return (
    <main className="grid md:grid-cols-2 gap-4">
      <div className="flex flex-col gap-4">
        <IssueSummmary open={openIssues} closed={closedIssues} inProgress={inProgressIssues}/>
        <IssueChart open={openIssues} closed={closedIssues} inProgress={inProgressIssues}/>
      </div>

      <LatestIssues/>

      </main>
  );
}

export const metadata: Metadata= {
  title: 'Issue Manager - Dashboard',
  description: 'One stop soution to manage all your issues'
}