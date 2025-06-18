import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import WaitlistPage from "./page";
import fetchMock from "jest-fetch-mock";

const invalidEmails = [
  "testemail30072001@gmail.",
  "testemail30072001@",
  ".testemail@gmail.com",
  "testemail.@gmail.com",
  "test..email@gmail.com",
  "testemail30072001@gmail..com",
  "testemail30072001@gmail.-com",
  "testemail30072001@gmail.com-",
  "test email30072001@gmail.com",
  "testemail30072001@аамсв.ком",
  "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa@gmail.com",
  "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa@example-very-long-domain-name-that-keeps-going-and-going-and-going-and-yes-still-going.com",
];

const validEmail = "test@example.com";

describe("WaitlistPage - валидация email и поведение формы", () => {
  beforeEach(() => {
    // Сбрасываем моки перед каждым тестом
    fetchMock.resetMocks();
    render(<WaitlistPage />);
  });

  test.each(invalidEmails)(
    "показывает ошибку под полем ввода для невалидного email: %s",
    async (email) => {
      const input = screen.getByPlaceholderText(/enter your email/i);
      const button = screen.getByRole("button", { name: /notify me/i });

      await userEvent.clear(input);
      await userEvent.type(input, email);
      await userEvent.click(button);

      expect(
        screen.getByText("Пожалуйста, введите действительный email.")
      ).toBeInTheDocument();
      expect(fetchMock).not.toHaveBeenCalled(); // Проверяем, что fetch не вызывался
    }
  );

  test("показывает сообщение об успехе при валидном email и успешном запросе", async () => {
    fetchMock.mockResponseOnce("Success");

    const input = screen.getByPlaceholderText(/enter your email/i);
    const button = screen.getByRole("button", { name: /notify me/i });

    await userEvent.clear(input);
    await userEvent.type(input, validEmail);
    await userEvent.click(button);

    await waitFor(() => {
      expect(
        screen.getByText("Вы успешно подписались на ожидание! 🎉")
      ).toBeInTheDocument();
    });

    expect(input).toHaveValue(""); // Проверяем, что поле ввода очищено
    expect(fetchMock).toHaveBeenCalledWith(
      "https://script.google.com/macros/s/AKfycbyw9-YNzVY4ubsB-GBXKMIjLM_Eng7uW15XBZ5LDB-eC4a29FuZ5PhHEWHmutSS87aA4A/exec",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: expect.stringContaining(`email=${validEmail}`), // Проверяем, что тело содержит нужную строку
      })
    );
  });

  test("показывает состояние загрузки при отправке формы", async () => {
    fetchMock.mockResponseOnce(
      () =>
        new Promise((resolve) =>
          setTimeout(() => resolve({ body: "Success" }), 100)
        )
    );

    const input = screen.getByPlaceholderText(/enter your email/i);
    const button = screen.getByRole("button", { name: /notify me/i });

    await userEvent.clear(input);
    await userEvent.type(input, validEmail);
    await userEvent.click(button);

    expect(button).toHaveTextContent("Отправка…");
    expect(button).toBeDisabled();

    await waitFor(() => {
      expect(button).toHaveTextContent("Notify Me");
      expect(button).not.toBeDisabled();
    });
  });

  test("показывает ошибку при неуспешном запросе", async () => {
    fetchMock.mockResponseOnce("Error");

    const input = screen.getByPlaceholderText(/enter your email/i);
    const button = screen.getByRole("button", { name: /notify me/i });

    await userEvent.clear(input);
    await userEvent.type(input, validEmail);
    await userEvent.click(button);

    await waitFor(() => {
      expect(
        screen.getByText("Что-то пошло не так. Попробуйте ещё раз.")
      ).toBeInTheDocument();
    });
  });

  test("показывает ошибку при сбое сети", async () => {
    // Подавляем console.error для этого теста
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

    fetchMock.mockRejectOnce(new Error("Network error"));

    const input = screen.getByPlaceholderText(/enter your email/i);
    const button = screen.getByRole("button", { name: /notify me/i });

    await userEvent.clear(input);
    await userEvent.type(input, validEmail);
    await userEvent.click(button);

    await waitFor(() => {
      expect(
        screen.getByText("Ошибка сети. Повторите попытку позже.")
      ).toBeInTheDocument();
    });

    consoleErrorSpy.mockRestore();
  });
});
