import { renderHook, act } from "@testing-library/react";
import { useWaitlist } from "./useWaitList";

// мокаем NotificationService
jest.mock("@/shared/lib/NotificationService", () => ({
  NotificationService: {
    error: jest.fn(),
    success: jest.fn(),
    loading: jest.fn(),
    dismiss: jest.fn(),
  },
}));

// мокаем fetch
global.fetch = jest.fn();

describe("useWaitlist", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call error if email is invalid", async () => {
    const { result } = renderHook(() => useWaitlist());
    act(() => result.current.setEmail("invalid-email"));

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(
      require("@/shared/lib/NotificationService").NotificationService.error
    ).toHaveBeenCalledWith("Please enter a valid email address.");
  });

  it("should call success and reset email on success", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: "Success" }),
    });

    const { result } = renderHook(() => useWaitlist());

    act(() => result.current.setEmail("test@example.com"));

    await act(async () => {
      await result.current.handleSubmit();
    });

    const { NotificationService } = require("@/shared/lib/NotificationService");

    expect(NotificationService.loading).toHaveBeenCalled();
    expect(NotificationService.dismiss).toHaveBeenCalled();
    expect(NotificationService.success).toHaveBeenCalledWith(
      "You’ve successfully subscribed! 🎉"
    );
    expect(result.current.email).toBe("");
  });

  it("should call error if API returns error", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: "Failed" }),
    });

    const { result } = renderHook(() => useWaitlist());

    act(() => result.current.setEmail("test@example.com"));

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(
      require("@/shared/lib/NotificationService").NotificationService.error
    ).toHaveBeenCalledWith("Failed");
  });

  it("should show network error if fetch throws", async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error("network error"));

    const { result } = renderHook(() => useWaitlist());

    act(() => result.current.setEmail("test@example.com"));

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(
      require("@/shared/lib/NotificationService").NotificationService.error
    ).toHaveBeenCalledWith("Network error. Please try again later.");
  });
});
