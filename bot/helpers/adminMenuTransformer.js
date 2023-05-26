async function adminMenuTransformer(data, config) {
  const { context, credentials } = config;
  const adminName = await context.activity.from.name;
  const adminEmail = await credentials.userEmail;

  console.log("newData Before: ", newData);

  const newBody = [
    [
      {
        type: "Container",
        items: [
          {
            type: "TextBlock",
            text: "Робоча область адміністратора",
            size: "large",
            weight: "bolder",
          },
          {
            type: "ColumnSet",
            columns: [
              {
                type: "Column",
                width: "auto",
                items: [
                  {
                    type: "Image",
                    url: "https://i.ibb.co/pRNnXxf/32-32.png",
                    altText: adminName,
                    size: "small",
                    style: "person",
                  },
                ],
              },
              {
                type: "Column",
                width: "stretch",
                items: [
                  {
                    type: "TextBlock",
                    text: adminName,
                    weight: "bolder",
                    wrap: true,
                  },
                  {
                    type: "TextBlock",
                    spacing: "none",
                    text: adminEmail,

                    isSubtle: true,
                    wrap: true,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: "TextBlock",
        text: "Взаємодія з користувачем",
        weight: "bolder",
        wrap: true,
      },
    ],
  ];

  data.body = newBody;

  console.log("newData After: ", data);

  return data;
}

module.exports = adminMenuTransformer;
