function activeManagerRemainderSpecTr(reminder) {
  try {
    return [
      {
        type: "TextBlock",
        text: `Твій спеціаліст ${reminder.userName} вже 6 місяців в компанії, зв’яжіться з ним, щоб обговорити карʼєрний план.`,
        wrap: true,
        weight: "bolder",
      },
      {
        type: "TextBlock",
        text: "💡 Для створення ефективного кар’єрного плану необхідно визначитися з трьома базовими складовими: мета, шлях, ресурси.",
        wrap: true,
      },
    ];
  } catch (error) {
    console.log(error.message);
    console.log("activeManagerRemainderSpecTr: Failed to trnsform card.");
    return null;
  }
}

module.exports = activeManagerRemainderSpecTr;
