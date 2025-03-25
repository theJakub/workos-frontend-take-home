# Setup

## Install dependencies

```bash
npm install
```

## Run the app

From the server directory run the following in one terminal window:

```bash
npm run api
```

From the client directory run the following in one terminal window:

```bash
npm run dev
```

## About my app

I kept my working time close to 8 hours.

I used the following technologies:

- Vite/React
- Typescript
- React-query
- Radix-ui
- Radix-icons
- lodash

I was able to complete tasks 1-5 and 7.

The reason I completed 7 without 6 is because of my work when implementing my hook for fetching users. Since pagination was part of the request params, I included them in the hook. Since the hook was prepared for those params, I made the decision to make a simple button section for pagination while implementing step 2.

I ended up doing step 5 while implementing step 2. I did this because the roles data was needed to display the role name for step 2. Once I had the data, it was simple to add another table for Roles.

When implementing step 3, I included the 'add' button in the UI though I did not implement the functionality. I added a debounce to the input to ensure that the API is not called on every keystroke.

When implementing step 4, I tried to make reusable components for this app and compose them with DropdownMenu and AlertDialog. The Menu I created could also be used for Role renaming, but I did not get to that step. The Modal I created could be used for adding users editing user, and renaming roles.

### Desired improvements

#### Styles

I applied the purple from the design to the main accent color, but the hover shade doesn't compliment my applied color. I would like to find an array of purples to match the given shade to better extend the theme.

The disabled state for my pagination buttons doesn't match the design. I left the default disabled styles for that button variant. I would like to update the disabled styles to match the design.

For all click targets I would change the cursor to pointer on hover. I believe this greatly improves the UX.

#### Logic and implementation

The roles data is in a context, but users are not. I would really like to put the users data into a context as well. This could allow for the paginated data to stay in context and not be refetched if a user views a page that has already been fetched. It would also improve the preceived speed of deleting and adding users via optimistic updates to the context data before API responses are complete.

I did not apply error handling UI. I added rety counts using react-query options for dev speed, and then did not leave myself time to circle back and implement UI states. For both the user and role tables, I would have liked to have error text in place of the table that states that an error occurred. The message would also include an option to retry. Since the users table relys on the roles data, I would need a state for the users success, but roles error. I was thinking a 'toast' type component would have been good for this. It could be state that roles failed, be dissmissable and/or give an option to retry. This way it wouldn't negatively affect the use of the rest of the users table. I also did not implement an error message for deleting a user. This could have been a toast component as well.

I made a note in the TableLoading component about extending the props to include some styles/spacings. This would allow the column spacing and row heights to more closely match the table with loaded data. This would prevent a 'jumpy' screen when the table changes from skeletons to loaded data.

I added an extra row to the table to show the pagination buttons. I did this to take advantage of the styles I would get for free from the Table component. It does match the designs, but as the screen shrinks, the last column maintains size for the paginiation buttons. What I don't like about this is that the user data will loose space, but a decent amount of white space will be maintained next to the menu button. I feel like this is not a great use of space when the screen is small.
My preference would be to extend the Table component to include a .Footer. Having a footer that displays like a row, but without being locked into columns would be very useful for the pagination buttons. Another options would just be to use a Box and add the correct border and radius. This would also require the bottom radius on the table to be removed.

## Added late

I realized I forgot animations. I spent about 30 minutes adding animations the morning after submission.

I used motion as my animation package.

I animated the Users page and the Modal.
