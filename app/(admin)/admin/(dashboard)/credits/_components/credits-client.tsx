"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { useCookies } from "next-client-cookies";
import { toast } from "sonner";
import Image from "next/image";
import qs from "query-string";
import axios from "axios";
import {
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Edit,
  Loader2,
  Save,
  Search,
  TextSelect,
  Undo2,
  X,
} from "lucide-react";

import { baseUrl, cn, formatNumber, month } from "@/lib/utils";
import { useDebounce } from "@/hooks/use-debounce";

import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChartCredit } from "./chart-credits";
import { Input } from "@/components/ui/input";

interface UsersProps {
  id: string;
  name: string;
  total_tokens: number;
}

interface SelectedDateProps {
  month: number;
  year: number;
}

interface FirstLastDateProps {
  first_month: number;
  last_month: number;
  first_year: number;
  last_year: number;
}

export interface SelectedBarDataProps {
  date: number;
  in: number;
  out: number;
}

export const CreditsClient = () => {
  const cookies = useCookies();
  const token = cookies.get("accessToken");
  const params = useSearchParams();
  const router = useRouter();

  const [current, setCurrent] = useState<UsersProps>({
    id: "",
    name: "",
    total_tokens: 0,
  });
  const [selectedBar, setSelectedBar] = useState<SelectedDateProps>({
    month: 1,
    year: new Date().getFullYear(),
  });
  const [firstLast, setFirstLast] = useState<FirstLastDateProps>();
  const [userList, setUserList] = useState<UsersProps[]>([]);
  const [selectedBarData, setSelectedBarData] = useState<
    SelectedBarDataProps[]
  >([]);

  const [isUpdatingList, setIsUpdatingList] = useState<boolean>(false);
  const [isUpdatingBar, setIsUpdatingBar] = useState<boolean>(false);
  const [editedKredit, setEditedKredit] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isGetList, setIsGetList] = useState<boolean>(false);

  const [search, setSearch] = useState(params.get("q") ?? "");
  const searchValue = useDebounce(search);

  const [page, setPage] = useState({
    current: parseFloat(params.get("page") ?? "1") ?? 1,
    last: 1,
    prev: 1,
    next: 1,
    total: 1,
  });

  const handleCurrentId = useCallback(
    (id: string, q: string, page: number) => {
      let currentQuery = {};

      if (params) {
        currentQuery = qs.parse(params.toString());
      }

      const updateQuery: any = {
        ...currentQuery,
        q: q,
        currentId: id,
        page: page,
      };

      if (!q || q === "") {
        delete updateQuery.q;
      }

      if (!id || id === "") {
        delete updateQuery.currentId;
      }

      if (!page || page === 0) {
        delete updateQuery.page;
      }

      const url = qs.stringifyUrl(
        {
          url: "/admin/credits",
          query: updateQuery,
        },
        { skipNull: true }
      );

      router.push(url);
    },
    [params, router]
  );

  const handleUpdateKredit = async (e: FormEvent, dataId: string) => {
    e.preventDefault();
    const body = new FormData();
    body.append("user_id", current.id);
    body.append("amount", current.total_tokens.toString());
    try {
      setIsUpdatingList(true);
      await axios.post(
        `${baseUrl}/superadmin/kredit/updatekredit/${dataId}`,
        body,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(`Kredit berhasi diperbarui`);
      cookies.set("updated", "updated");
      setEditedKredit(false);
    } catch (error: any) {
      console.log("[ERROR_UPDATE_KREDIT]:", error);
      toast.custom(
        (t) => (
          <div className="flex gap-3 relative w-full items-center">
            <div className="flex gap-3 w-full">
              <AlertCircle className="w-4 h-4 dark:fill-white dark:text-red-800 text-red-500" />
              <div className="flex flex-col gap-1">
                <h5 className="font-medium dark:text-white text-sm leading-none text-red-500">
                  Kredit gagal diperbarui
                </h5>
                {error.response.data.message && (
                  <ul className="*:before:content-['-'] *:before:pr-3 dark:text-red-200 text-xs text-red-400">
                    <li>{error.response.data.message}</li>
                  </ul>
                )}
              </div>
            </div>
            <button
              type="button"
              onClick={() => toast.dismiss(t)}
              className="w-5 h-5 text-white flex-none bg-red-500 ml-auto flex items-center justify-center rounded-full hover:scale-110 transition-all shadow"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ),
        {
          duration: 3000,
          classNames: {
            toast:
              "group-[.toaster]:dark:bg-red-800 group-[.toaster]:bg-red-50 group-[.toaster]:border-red-300 group-[.toaster]:dark:text-white group-[.toaster]:w-full group-[.toaster]:p-4 group-[.toaster]:border group-[.toaster]:rounded-md",
          },
        }
      );
    } finally {
      setIsUpdatingList(false);
    }
  };

  const getKreditList = async () => {
    try {
      setIsGetList(true);
      const res = await axios.get(
        `${baseUrl}/superadmin/kredit${
          searchValue !== ""
            ? search !== ""
              ? "?q=" + searchValue
                ? search
                : ""
              : ""
            : ""
        }`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserList(res.data.data.data ?? []);
      setPage({
        current: res.data.data.current_page,
        last: res.data.data.last_page,
        prev: res.data.data.links[0].active ? res.data.data.links[0].label : 1,
        next: res.data.data.links[res.data.data.data.length - 1].active
          ? res.data.data.links[res.data.data.data.length - 1].label
          : 1,
        total: res.data.data.total,
      });
    } catch (error) {
      console.log("[ERROR_GET_KREDIT_LIST]:", error);
    } finally {
      setIsGetList(false);
    }
  };

  const getDetailKredit = async (dataId: string) => {
    try {
      setIsUpdating(true);
      const res = await axios.get(`${baseUrl}/superadmin/kredit/${dataId}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setCurrent(res.data.data.detail);
    } catch (error) {
      console.log("[ERROR_GET_KREDIT_DETAIL]:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const getBarKredit = async (dataId: string, method: string) => {
    const currentMonth = selectedBar.month;
    const currentYear = selectedBar.year;
    const prevMonth = currentMonth <= 1 ? 12 : currentMonth - 1;
    const nextMonth = currentMonth >= 12 ? 1 : currentMonth + 1;
    const nextYear = currentMonth >= 12 ? currentYear + 1 : currentYear;
    const prevYear = currentMonth <= 1 ? currentYear - 1 : currentYear;
    try {
      setIsUpdatingBar(true);
      const res = await axios.get(
        `${baseUrl}/superadmin/kredit/bar/${dataId}${
          method === "prev" ? "?m=" + prevMonth + "&y=" + prevYear : ""
        }${method === "next" ? "?m=" + nextMonth + "&y=" + nextYear : ""}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const response = res.data.data;
      setSelectedBar({
        month: parseFloat(response.selected_month.date.month),
        year: parseFloat(response.selected_month.date.year),
      });
      setSelectedBarData(response.bar);
      setFirstLast({
        first_month: parseFloat(response.month.first_month.month),
        last_month: parseFloat(response.month.last_month.month),
        first_year: parseFloat(response.month.first_month.year),
        last_year: parseFloat(response.month.last_month.year),
      });
    } catch (error) {
      console.log("[ERROR_GET_KREDIT_BAR]:", error);
    } finally {
      setIsUpdatingBar(false);
    }
  };

  const handleChangeCurrent = (dataId: string) => {
    handleCurrentId(dataId, search, page.current);
    setEditedKredit(false);
  };

  useEffect(() => {
    handleCurrentId(params.get("currentId") ?? "", searchValue, page.current);
  }, [searchValue]);

  useEffect(() => {
    if (params.get("currentId")) {
      getDetailKredit(params.get("currentId") ?? "");
      getBarKredit(params.get("currentId") ?? "", "");
    } else {
      setCurrent({ id: "", name: "", total_tokens: 0 });
    }
  }, [params.get("currentId")]);

  useEffect(() => {
    if (cookies.get("updated")) {
      setIsUpdatingBar(true);
      getBarKredit(current.id, "");
      getKreditList();
      return cookies.remove("updated");
    }
  }, [cookies.get("updated")]);

  useEffect(() => {
    getKreditList();
  }, [params.get("q")]);

  useEffect(() => {
    getKreditList();
    handleCurrentId(
      params.get("currentId") ?? "",
      params.get("q") ?? "",
      page.current
    );
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <div className="flex h-full gap-2 md:gap-6 flex-col lg:flex-row">
      <div className="w-full lg:w-1/2 xl:w-2/5 lg:flex-1 xl:flex-auto">
        <Card className="p-2 md:p-4">
          <div className="w-full relative flex items-center mb-4">
            <Search className="w-5 h-5 peer absolute left-3 text-gray-500" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-200 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-400 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400"
              placeholder="Search user name..."
            />
          </div>
          {userList.length !== 0 ? (
            <ul
              className={cn(
                "md:pt-2 space-y-2 flex flex-col relative w-full h-auto",
                userList.length === 0 && "min-h-[200px]"
              )}
            >
              {(isGetList || isUpdatingList) && (
                <div className="w-full h-full absolute bg-gray-500/20 backdrop-blur-sm top-0 left-0 z-10 flex items-center justify-center rounded-md">
                  <Loader2 className="w-10 h-10 animate-spin text-gray-700 dark:text-white" />
                </div>
              )}
              {userList.map((item) => (
                <li className="capitalize" key={item.id}>
                  <Button
                    className={cn(
                      "md:py-2 md:px-5 px-2 py-1.5 h-14 md:h-20 rounded-sm text-xs md:text-sm flex  gap-1 justify-between items-center w-full text-black dark:text-white bg-white hover:bg-green-50 dark:bg-gray-900 border dark:hover:bg-gray-700/40",
                      current.id === item.id
                        ? " border-green-400 hover:bg-green-100 bg-green-50 dark:bg-gray-800/70"
                        : " border-green-400/40"
                    )}
                    onClick={() =>
                      current.id !== item.id && handleChangeCurrent(item.id)
                    }
                  >
                    <div className="flex gap-x-2 items-center w-full">
                      <div className="w-10 aspect-square md:w-14 overflow-hidden rounded relative flex-none">
                        <Image alt="" src={"/avatar.webp"} fill />
                      </div>
                      <div className="flex w-full justify-between">
                        <div className="flex flex-col text-ellipsis overflow-hidden w-full flex-1 text-start capitalize">
                          <p>{item.name}</p>
                        </div>
                        <div className="w-auto xl:w-[150px] flex-none text-center">
                          {formatNumber(item.total_tokens)} Kredit
                        </div>
                      </div>
                    </div>
                    <div className="w-auto lg:w-[50px] flex-none flex justify-center">
                      <Button
                        size={"icon"}
                        className=" hover:bg-gray-200 dark:hover:bg-gray-700 h-6 w-6"
                        variant={"ghost"}
                        onClick={() => {
                          current.id === item.id &&
                            handleCurrentId("", search, page.current);
                        }}
                      >
                        {current.id === item.id ? (
                          <X className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="md:pt-2 space-y-2 flex flex-col relative w-full">
              {isGetList && (
                <div className="w-full h-full absolute bg-gray-500/20 backdrop-blur-sm top-0 left-0 z-10 flex items-center justify-center rounded-md">
                  <Loader2 className="w-10 h-10 animate-spin text-gray-700 dark:text-white" />
                </div>
              )}
              <div className="w-full h-[220px] flex items-center justify-center flex-col text-gray-400">
                <TextSelect className="md:w-16 md:h-16 w-12 h-12" />
                <h3 className="text-lg md:text-2xl font-bold mt-2 text-gray-500">
                  No data listed.
                </h3>
                <p className="text-xs md:text-sm leading-none">
                  Please, include any data or correct params.
                </p>
              </div>
            </div>
          )}
        </Card>
        <div className="flex w-full items-center justify-between">
          <div className="flex gap-5 items-center">
            <p className="text-sm">Total User: {page.total}</p>
          </div>
          <div className="flex gap-5 items-center">
            <p className="text-sm">
              Page {page.current} of {page.last}
            </p>
            <div className="flex items-center gap-2">
              <Button
                className="p-0 h-9 w-9 bg-green-400/80 hover:bg-green-400 text-black"
                onClick={() =>
                  handleCurrentId(
                    params.get("currentId") ?? "",
                    searchValue,
                    page.prev
                  )
                }
                disabled={page.prev === page.current}
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                className="p-0 h-9 w-9 bg-green-400/80 hover:bg-green-400 text-black"
                onClick={() =>
                  handleCurrentId(
                    params.get("currentId") ?? "",
                    searchValue,
                    page.next
                  )
                }
                disabled={page.next === page.current}
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="h-full w-full lg:w-1/2 xl:w-3/5 lg:flex-1 xl:flex-auto relative">
        {isUpdating && (
          <div className="w-full h-full absolute bg-gray-500/20 backdrop-blur-sm top-0 left-0 z-10 flex items-center justify-center rounded-md">
            <Loader2 className="w-10 h-10 animate-spin text-gray-700 dark:text-white" />
          </div>
        )}
        {current.id !== "" ? (
          <Card className="flex flex-col p-2 md:p-4 gap-4 h-full w-full">
            <form
              onSubmit={(e) => handleUpdateKredit(e, current.id)}
              className="md:py-2 md:px-5 px-2 py-1.5 rounded-sm text-xs md:text-sm flex bg-gray-200 dark:bg-transparent  justify-between items-center w-full dark:border-gray-700/70 dark:border"
            >
              <div className="w-full">
                <div className="flex gap-x-4 items-center w-full justify-between">
                  <div className="w-10 h-10 overflow-hidden rounded relative flex-none">
                    <Image alt="" src={"/avatar.webp"} fill />
                  </div>
                  <div
                    className={cn(
                      "flex w-full pr-4",
                      !editedKredit
                        ? "flex-col md:flex-row md:items-center md:gap-6 gap-2"
                        : "flex-col gap-1 xl:flex-row xl:items-center"
                    )}
                  >
                    <p className="text-sm md:text-base font-semibold flex-1 text-ellipsis overflow-hidden whitespace-nowrap capitalize">
                      {current.name}
                    </p>
                    {!editedKredit ? (
                      <div className="w-auto xl:w-[150px] flex-none ">
                        {formatNumber(current.total_tokens)} Kredit
                      </div>
                    ) : (
                      <Input
                        type="number"
                        className="h-9 px-2 w-auto xl:w-[150px] flex-none"
                        value={current.total_tokens}
                        onChange={(e) =>
                          setCurrent((prev) => ({
                            ...prev,
                            total_tokens: parseFloat(e.target.value),
                          }))
                        }
                      />
                    )}
                  </div>
                </div>
              </div>
              {!editedKredit ? (
                <div className="w-[50px] flex-none flex justify-center">
                  <Button
                    type="button"
                    size={"icon"}
                    className={cn(
                      "text-black hover:bg-yellow-300 bg-yellow-400"
                    )}
                    onClick={(e) => {
                      e.preventDefault();
                      setEditedKredit(!editedKredit);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="w-[100px] flex-none flex justify-center gap-2">
                  <Button
                    type="submit"
                    size={"icon"}
                    className={cn("text-black hover:bg-green-300 bg-green-400")}
                  >
                    <Save className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    size={"icon"}
                    className={cn(
                      "text-black hover:bg-gray-100 bg-transparent border border-gray-700 hover:border-gray-900 dark:text-white dark:border-gray-200/30 dark:hover:border-gray-200/70 dark:hover:bg-gray-700/40"
                    )}
                    onClick={(e) => {
                      e.preventDefault();
                      setEditedKredit(!editedKredit);
                    }}
                  >
                    <Undo2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </form>
            <div className="h-full border dark:border-gray-700/70 rounded-md">
              <div className="flex md:justify-between md:items-center px-4 pt-4 gap-2 md:gap-0 md:px-5 mb-4 flex-col md:flex-row items-start">
                <CardTitle>Kredit Flow</CardTitle>
                <div className="flex border p-1.5 rounded-md text-sm font-semibold items-center gap-x-2">
                  <Button
                    className="md:h-5 md:w-5 rounded-sm p-0 w-4 h-4"
                    variant={"ghost"}
                    onClick={() => getBarKredit(current.id, "prev")}
                    disabled={
                      selectedBar.month === firstLast?.first_month &&
                      selectedBar.year === firstLast.first_year
                    }
                  >
                    <ChevronLeft className="w-3 md:w-4 h-3 md:h-4" />
                  </Button>
                  <span className="capitalize md:w-36 w-full select-none flex items-center justify-center text-xs md:text-sm">
                    {month[selectedBar.month - 1].label +
                      " - " +
                      selectedBar.year}
                  </span>
                  <Button
                    className="md:h-5 md:w-5 rounded-sm p-0 w-4 h-4"
                    variant={"ghost"}
                    onClick={() => getBarKredit(current.id, "next")}
                    disabled={
                      selectedBar.month === firstLast?.last_month &&
                      selectedBar.year === firstLast.last_year
                    }
                  >
                    <ChevronRight className="w-3 md:w-4 h-3 md:h-4" />
                  </Button>
                </div>
              </div>
              <div className="xl:h-[350px] md:h-[300px] h-[200px] relative">
                {!isUpdating && isUpdatingBar && (
                  <div className="w-full h-full absolute bg-gray-500/20 backdrop-blur-sm top-0 left-0 z-10 flex items-center justify-center rounded-md">
                    <Loader2 className="w-10 h-10 animate-spin text-gray-700 dark:text-white" />
                  </div>
                )}
                {!isUpdatingBar && selectedBarData && (
                  <ChartCredit
                    month={month[selectedBar.month - 1].value}
                    initialData={selectedBarData}
                  />
                )}
              </div>
            </div>
          </Card>
        ) : (
          <Card className="md:py-2 md:px-5 px-2 py-1.5 rounded-sm text-sm flexjustify-between items-center w-full">
            <div className="w-full h-[300px] flex items-center justify-center flex-col text-gray-400">
              <TextSelect className="w-16 h-16 " />
              <h3 className="text-2xl font-bold mt-2 text-gray-500">
                No data viewed.
              </h3>
              <p className="text-sm leading-none">
                Please, select any data first.
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};
