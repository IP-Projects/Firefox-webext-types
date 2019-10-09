// Type definitions for the browser namespace used for browser extension development
// Project: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions
// Definitions by: Iulian Octavian Preda <https://github.com/IulianOctavianPreda>
// Definitions: https://github.com/firefox-webext-types
// TypeScript Version: 2.4

////////////////////
// Alarms
////////////////////
/**
 * Use the browser.alarms API to schedule code to run periodically or at a specified time in the future.
 * Browser compatibility: Chrome, Firefox(45), Opera, Firefox for Android (48)
 * Permissions:  "alarms"
 * https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/alarms
 */
declare namespace browser.alarms {
    /**
     * You can use this to specify when the alarm will initially fire, either as an absolute value (when), or as a delay from the time the alarm is set (delayInMinutes).
     * To make the alarm recur, specify periodInMinutes.
     * On Chrome, unless the extension is loaded unpackaged, alarms it creates are not allowed to fire more than once per minute.
     * If an extension tries to set delayInMinutes to a value < 1, or when to a value < 1 minute in the future, then the alarm will fire after 1 minute.
     * If an extension tries to set periodInMinutes to a value < 1, then the alarm will fire every minute.
     * Browser compatibility: Chrome, Firefox(45), Opera, Firefox for Android (48)
     */
    export interface AlarmCreateInfo {
        /**
         * Optional. The time the alarm will fire first, given as milliseconds since the epoch.
         * To get the number of milliseconds between the epoch and the current time, use Date.now().
         * If you specify when, don't specify delayInMinutes.
         */
        when?: number;
        /**
         * Optional. The time the alarm will fire first, given as minutes from the time the alarm is set.
         * If you specify delayInMinutes, don't specify when.
         */
        delayInMinutes?: number;
        /**
         * Optional. If this is specified, the alarm will fire again every periodInMinutes after its initial firing.
         * If you specify this value you may omit both when and delayInMinutes, and the alarm will then fire initially after periodInMinutes.
         * If periodInMinutes is not specified, the alarm will only fire once.
         */
        periodInMinutes?: number;
    }

    /**
     * Information about a single alarm. This object is returned from alarms.get() and alarms.getAll(), and is passed into the alarms.onAlarm listener.
     * Browser compatibility: Chrome, Firefox(45), Opera, Firefox for Android (48)
     */
    export interface Alarm {
        /** Name of this alarm. This is the name that was passed into the alarms.create() call that created this alarm. */
        name: string;
        /** Time at which the alarm is scheduled to fire next, in milliseconds since the epoch. */
        scheduledTime: number;
        /** Optional. If this is not null, then the alarm is periodic, and this represents its period in minutes. */
        periodInMinutes?: number;
    }

    export interface AlarmEvent extends browser.events.Event<(alarm: Alarm) => void> {}

    /**
     * Creates a new alarm for the current browser session. An alarm may fire once or multiple times. An alarm is cleared after it fires for the last time.
     * @param alarmInfo Describes when the alarm should fire. The initial time must be specified by either when or delayInMinutes (but not both). If periodInMinutes is set, the alarm will repeat every periodInMinutes minutes after the initial event. If neither when or delayInMinutes is set for a repeating alarm, periodInMinutes is used as the default for delayInMinutes.
     * Browser compatibility: Chrome, Firefox(45), Opera, Firefox for Android (48)
     */
    export function create(alarmInfo: AlarmCreateInfo): void;

    /**
     * Creates a new alarm for the current browser session. An alarm may fire once or multiple times. An alarm is cleared after it fires for the last time.
     * @param name Optional name to identify this alarm. Defaults to the empty string.
     * @param alarmInfo Describes when the alarm should fire. The initial time must be specified by either when or delayInMinutes (but not both). If periodInMinutes is set, the alarm will repeat every periodInMinutes minutes after the initial event. If neither when or delayInMinutes is set for a repeating alarm, periodInMinutes is used as the default for delayInMinutes.
     * Browser compatibility: Chrome, Firefox(45), Opera, Firefox for Android (48)
     */
    export function create(name: string, alarmInfo: AlarmCreateInfo): void;

    /**
     * Gets all active alarms for the extension.
     * @returns A Promise that will be fulfilled with an array of Alarm objects. Each of these represents an active alarm that belongs to the extension. If no alarms are active, the array will be empty.
     * Browser compatibility: Chrome, Firefox(45), Opera, Firefox for Android (48)
     */
    export function getAll(): Promise<Alarm[]>;

    /**
     * Cancels all active alarms.
     * @returns A Promise that will be fulfilled with a boolean. This will be true if any alarms were cleared, false otherwise. Note that Chrome always passes true here.
     * Browser compatibility: Chrome, Firefox(45), Opera, Firefox for Android (48)
     */
    export function clearAll(): Promise<boolean>;

    /**
     * Cancels an alarm, given its name.
     * @param name The name of the alarm to clear. Defaults to the empty string.
     * @returns A Promise that will be fulfilled with a boolean. This will be true if the alarm was cleared, false otherwise.
     * Browser compatibility: Chrome, Firefox(45), Opera, Firefox for Android (48)
     */
    export function clear(name?: string): Promise<boolean>;

    /**
     * Cancels an alarm, given its name.
     * @returns A Promise that will be fulfilled with a boolean. This will be true if the alarm was cleared, false otherwise.
     * Browser compatibility: Chrome, Firefox(45), Opera, Firefox for Android (48)
     */
    export function clear(): Promise<boolean>;

    /**
     * Gets an alarm, given its name.
     * @returns A Promise that will be fulfilled with an Alarm object. This represents the alarm whose name matches name. If no alarms match, this will be undefined.
     * Browser compatibility: Chrome, Firefox(45), Opera, Firefox for Android (48)
     */
    export function get(): Promise<Alarm>;

    /**
     * Gets an alarm, given its name.
     * @param name The name of the alarm to get. Defaults to the empty string.
     * @returns A Promise that will be fulfilled with an Alarm object. This represents the alarm whose name matches name. If no alarms match, this will be undefined.
     * Browser compatibility: Chrome, Firefox(45), Opera, Firefox for Android (48)
     */
    export function get(name: string): Promise<Alarm>;

    /**
     * Fired when an alarm has elapsed. Useful for event pages.
     * Browser compatibility: Chrome, Firefox(45), Opera, Firefox for Android (48)
     */
    export var onAlarm: AlarmEvent;
}

////////////////////
// Bookmarks
////////////////////
/**
 * Use the browser.bookmarks API to create, organize, and otherwise manipulate bookmarks. Also see Override Pages, which you can use to create a custom Bookmark Manager page.
 * Browser compatibility: Chrome, Firefox(45), Opera
 * Permissions:  "bookmarks"
 * https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/bookmarks
 */
declare namespace browser.bookmarks {
    /**
     * A node in the bookmark tree, where each node is a bookmark, a bookmark folder, or a separator. Child nodes are ordered by an index within their respective parent folders.
     * Browser compatibility: Chrome, Firefox(45), Opera
     */
    export interface BookmarkTreeNode {
        /** Optional. An array of bookmarks.BookmarkTreeNode objects which represent the node's children.
         * The list is ordered in the list in which the children appear in the user interface.
         * This field is omitted if the node isn't a folder.
         */
        children?: BookmarkTreeNode[];
        /** Optional. A number representing the creation date of the node in milliseconds since the epoch.  */
        dateAdded?: number;
        /** Optional. A number representing the date and time the contents of this folder last changed, in milliseconds since the epoch.   */
        dateGroupModified?: number;
        /** A string which uniquely identifies the node. Each ID is unique within the user's profile and remains unchanged across browser restarts.  */
        id: string;
        /** Optional. A number which represents the zero-based position of this node within its parent folder, where zero represents the first entry.  */
        index?: number;
        /** Optional. A string which specifies the ID of the parent folder. This property is not present in the root node.   */
        parentId?: string;
        /** A string which contains the text displayed for the node in menus and lists of bookmarks. */
        title: string;
        /**
         * Optional. A bookmarks.BookmarkTreeNodeType object indicating whether this is a bookmark, a folder, or a separator.
         * Defaults to "bookmark" unless url is omitted, in which case it defaults to "folder".
         * Browser compatibility: Firefox(57)
         */
        type?: BookmarkTreeNodeType;
        /** Optional. A string as described by the type bookmarks.BookmarkTreeNodeUnmodifiable. Represents the reason that the node can't be changed. If the node can be changed, this is omitted. */
        unmodifiable?: any;
        /** Optional. A string which represents the URL for the bookmark. If the node represents a folder, this property is omitted. */
        url?: string;
    }

    /**
     * The bookmarks.BookmarkTreeNodeType type is used to describe whether a node in the bookmark tree is a bookmark, a folder, or a separator.
     * Browser compatibility: Firefox(57)
     */
    export type BookmarkTreeNodeType = "bookmark" | "folder" | "separator";

    /**
     * The bookmarks.BookmarkTreeNodeUnmodifiable is a string which can currently have only one value: "managed".
     * This indicates that the bookmark node was configured by an administrator or by the custodian of a supervised user (such as a parent, in the case of parental controls).
     */
    export type BookmarkTreeNodeUnmodifiable = "managed";

    /**
     * The CreateDetails type, renamed to BookmarkCreateArg to maintain compatibility with chrome types, is used to describe the properties of a new, bookmark, bookmark folder, or separator when calling the bookmarks.create() method.
     */
    export interface BookmarkCreateArg {
        /** Optional. An integer Number which specifies the position at which to place the new bookmark under its parent. A value of 0 will put it at the top of the list. */
        index?: number;
        /** Optional. A string which indicates the ID of the parent folder into which to place the new bookmark or bookmark folder. On Chrome and Firefox, the default is the "Other Bookmarks" folder on the Bookmarks menu. */
        parentId?: string;
        /** Optional. A string which specifies the title for the bookmark or the name of the folder to be created. If this isn't specified, the title is "". */
        title?: string;
        /** Optional. A bookmarks.BookmarkTreeNodeType object indicating whether this is a bookmark, a folder, or a separator. Defaults to "bookmark" unless url is omitted, in which case it defaults to "folder". */
        type?: BookmarkTreeNodeType;
        /** Optional. A string which specifies the URL of the page to bookmark. If this is omitted or is null, a folder is created instead of a bookmark. */
        url?: string;
    }

    /** An object which specifies the destination for the bookmark. */
    export interface BookmarkDestinationArg {
        /** Optional. A string which specifies the ID of the destination folder. If this value is left out, the bookmark is moved to a new location within its current folder. */
        parentId?: string;
        /** Optional. A 0-based index specifying the position within the folder to which to move the bookmark. A value of 0 moves the bookmark to the top of the folder. If this value is omitted, the bookmark is placed at the end of the new parent folder. */
        index?: number;
    }

    /** An object, it has zero or more of the following 3 properties: query, title, and url, which are described below. For a bookmark to match the query, all provided properties terms must match the specified values. */
    export interface BookmarkSearchQuery {
        /** Optional. A string specifying one or more terms to match against; the format is identical to the string form of the query parameter. If this isn't a string, an exception is thrown. */
        query?: string;
        /** Optional. A string which must exactly match the bookmark's URL. Matching is case-insensitive, and trailing slashes are ignored. If you pass an invalid URL here, the function will throw an exception. */
        url?: string;
        /** Optional. A string This must exactly match the bookmark tree node's title. Matching is case-sensitive. */
        title?: string;
    }

    /** An object specifying the changes to apply, with some combination of the following fields. Any items not specified aren't changed in the referenced bookmark or folder. */
    export interface BookmarkChangesArg {
        /** Optional. A string containing the new title of the bookmark, or the new name of the folder if id refers to a folder. */
        title?: string;
        /** Optional. A string providing a new URL for the bookmark. */
        url?: string;
    }

    /**
     * Creates a bookmark or folder as a child of the BookmarkTreeNode with the specified parentId. To create a folder, omit or leave empty the BookmarkCreateArg.url parameter.
     * @returns A Promise that will be fulfilled with a BookmarkTreeNode that describes the new bookmark node.
     */
    export function create(bookmark: BookmarkCreateArg): Promise<BookmarkTreeNode>;

    /**
     * Given the ID of a bookmarks.BookmarkTreeNode or an array of such IDs, the bookmarks.get() method retrieves the matching nodes.
     * @param id A single string-valued id of a BookmarkTreeNode object to retrieve.
     * @returns A Promise that will be fulfilled with an array of BookmarkTreeNode, one for each matching node. Separators are not included in the results. If no nodes could be found, the promise will be rejected with an error message.
     */
    export function get(id: string): Promise<BookmarkTreeNode[]>;

    /**
     * Given the ID of a bookmarks.BookmarkTreeNode or an array of such IDs, the bookmarks.get() method retrieves the matching nodes.
     * @param idList An array of string-valued ids of BookmarkTreeNode objects to retrieve.
     * @returns A Promise that will be fulfilled with an array of BookmarkTreeNode, one for each matching node. Separators are not included in the results. If no nodes could be found, the promise will be rejected with an error message.
     */
    export function get(idList: string[]): Promise<BookmarkTreeNode[]>;

    /**
     * Retrieves all the immediate children of a given bookmark folder, identified as a BookmarkTreeNode ID..
     * @param id A string which specifies the ID of the folder whose children are to be retrieved.
     * @returns A Promise that will be fulfilled with an array of BookmarkTreeNode objects. Each entry represents a single child node. The list is ordered in the same order in which the bookmarks appear in the user interface. Separators are currently not included in the results. The list includes subfolders, but does not include any children contained in subfolders.
     * If the specified node has no children, the array is empty.
     * If the node identified by id is not found, the promise is rejected with an error message
     */
    export function getChildren(id: string): Promise<BookmarkTreeNode[]>;

    /**
     * Retrieves a specified number of the most recently added bookmarks as an array of BookmarkTreeNode objects.
     * @param numberOfItems A number representing the maximum number of items to return. The returned list will contain up to this many of the most recently added items. The minimum allowed value here is 1. If you pass 0 or less, the function will throw an error.
     * @returns A Promise that will be fulfilled with an array of BookmarkTreeNode objects
     */
    export function getRecent(numberOfItems: number): Promise<BookmarkTreeNode[]>;

    /**
     * Asynchronously retrieves a bookmarks.BookmarkTreeNode, given its ID. If the item is a folder, you can access all its descendants recursively using its children property and the children property of its descendants, if they are themselves folders
     * @param id The ID of the root of the subtree to retrieve.
     * @returns A Promise that will be fulfilled with an array containing a single object, a bookmarks.BookmarkTreeNode object, representing the item with the given ID.
     * If a node corresponding to id could not be found, the promise will be rejected with an error message.
     */
    export function getSubTree(id: string): Promise<BookmarkTreeNode[]>;

    /**
     * Retrieves an array containing the root of the bookmarks tree as a bookmarks.BookmarkTreeNode object.
     * You can access the entire tree recursively using its children property and the children property of its descendants, if they are themselves folders.
     * @returns A Promise that will be fulfilled with an array containing one object, a bookmarks.BookmarkTreeNode object representing the root node.
     */
    export function getTree(): Promise<BookmarkTreeNode[]>;

    /**
     * Moves the specified BookmarkTreeNode to the specified destination within the tree of bookmarks. This lets you move a bookmark to a new folder and/or position within the folder.
     * @param id A string specifying the ID of the bookmark or folder to move.
     * @returns A Promise that will be fulfilled with a single bookmarks.BookmarkTreeNode object, describing the moved node. If the node corresponding to the id parameter can't be found, the promise is rejected with an error message.
     */
    export function move(
        id: string,
        destination: BookmarkDestinationArg
    ): Promise<BookmarkTreeNode>;

    /**
     * Removes a bookmark or an empty bookmark folder.
     * @param id A string specifying the ID of the bookmark to remove.
     * @returns A Promise that will be fulfilled with no arguments. If the node corresponding to the id parameter can't be found or was a non-empty folder, the promise is rejected with an error message.
     */
    export function remove(id: string): Promise<void>;

    /**
     * Recursively removes a bookmark folder.
     * @param id A string specifying the ID of the bookmark folder to remove.
     * @returns A Promise that will be fulfilled with no arguments. If the node corresponding to the id parameter can't be found or was a non-empty folder, the promise is rejected with an error message.
     */
    export function removeTree(id: string): Promise<void>;

    /**
     * Searches for BookmarkTreeNodes matching the given query. This function throws an exception if any of the input parameters are invalid or are not of an appropriate type; look in the console for the error message.
     * The exceptions don't have error IDs, and the messages themselves may change, so don't write code that tries to interpret them.
     * @param query A string that consists of zero or more search terms. Search terms are space-delimited and may be enclosed in quotes to allow multiple-word phrases to be searched against. Each search term matches if it matches any substring in the bookmark's URL or title. Matching is case-insensitive. For a bookmark to match the query, all the query's search terms must match.
     * @returns A Promise that will be fulfilled with an array of bookmarks.BookmarkTreeNode objects, each representing a single matching bookmark tree node.
     * Results are returned in the order that the nodes were created. The array is empty if no results were found.
     * The BookmarkTreeNodes—even nodes of the "folder" type—returned by bookmarks.search() are missing the children property. To get a complete BookmarkTreeNode use bookmarks.getSubTree().
     */
    export function search(query: string): Promise<BookmarkTreeNode[]>;

    /**
     * Searches for BookmarkTreeNodes matching the given query. This function throws an exception if any of the input parameters are invalid or are not of an appropriate type; look in the console for the error message.
     * The exceptions don't have error IDs, and the messages themselves may change, so don't write code that tries to interpret them.
     * @param query an object, it has zero or more of the following 3 properties: query, title, and url.
     * @returns A Promise that will be fulfilled with an array of bookmarks.BookmarkTreeNode objects, each representing a single matching bookmark tree node.
     * Results are returned in the order that the nodes were created. The array is empty if no results were found.
     * The BookmarkTreeNodes—even nodes of the "folder" type—returned by bookmarks.search() are missing the children property. To get a complete BookmarkTreeNode use bookmarks.getSubTree().
     */
    export function search(query: BookmarkSearchQuery): Promise<BookmarkTreeNode[]>;

    /**
     * Updates the title and/or URL of a bookmark, or the name of a bookmark folder.
     * @param id A string specifying the ID of the bookmark or bookmark folder to update.
     * @param changes An object specifying the changes to apply.
     * @returns A Promise that will be fulfilled with a single bookmarks.BookmarkTreeNode object, representing the updated bookmark. If the bookmark item corresponding to the id parameter can't be found, the promise is rejected.
     */
    export function update(id: string, changes: BookmarkChangesArg): Promise<BookmarkTreeNode>;

    export interface BookmarkRemoveInfo {
        index: number;
        parentId: string;
        node: BookmarkTreeNode;
    }

    export interface BookmarkMoveInfo {
        index: number;
        oldIndex: number;
        parentId: string;
        oldParentId: string;
    }

    export interface BookmarkChangeInfo {
        url?: string;
        title: string;
    }

    export interface BookmarkReorderInfo {
        childIds: string[];
    }

    export interface BookmarkCreatedEvent
        extends browser.events.Event<(id: string, bookmark: BookmarkTreeNode) => void> {}

    export interface BookmarkRemovedEvent
        extends browser.events.Event<(id: string, removeInfo: BookmarkRemoveInfo) => void> {}

    export interface BookmarkChangedEvent
        extends browser.events.Event<(id: string, changeInfo: BookmarkChangeInfo) => void> {}

    export interface BookmarkMovedEvent
        extends browser.events.Event<(id: string, moveInfo: BookmarkMoveInfo) => void> {}

    export interface BookmarkChildrenReordered
        extends browser.events.Event<(id: string, reorderInfo: BookmarkReorderInfo) => void> {}

    export interface BookmarkImportBeganEvent extends browser.events.Event<() => void> {}

    export interface BookmarkImportEndedEvent extends browser.events.Event<() => void> {}

    /** Fired when a bookmark or folder is created. */
    export var onCreated: BookmarkCreatedEvent;

    /** Fired when a bookmark or folder is removed. When a folder is removed recursively, a single notification is fired for the folder, and none for its contents. */
    export var onRemoved: BookmarkRemovedEvent;

    /** Fired when a bookmark or folder changes. Note: Currently, only title and url changes trigger this. */
    export var onChanged: BookmarkChangedEvent;

    /** Fired when a bookmark or folder is moved to a different parent folder or to a new offset within its folder. */
    export var onMoved: BookmarkMovedEvent;

    /** Fired when the user has sorted the children of a folder in the browser's UI. This is not called as a result of a move(). */
    export var onChildrenReordered: BookmarkChildrenReordered;

    /**
     * Fired when a bookmark import session is begun. Expensive observers should ignore bookmarks.onCreated updates until bookmarks.onImportEnded is fired.
     * Observers should still handle other notifications immediately.
     */
    export var onImportBegan: BookmarkImportBeganEvent;

    /** Fired when a bookmark import session has finished. */
    export var onImportEnded: BookmarkImportEndedEvent;
}

////////////////////
// Events
////////////////////

/**
 * The browser.events namespace contains common types used by APIs dispatching events to notify you when something interesting happens.
 * Browser compatibility: Chrome, Firefox(50), Opera, Firefox for Android (50)
 */
declare namespace browser.events {
    /**
     *  Describes various criteria for filtering URLs.
     *  If all of the criteria specified in the filter's properties match the URL, then the filter matches.
     *  Filters are often provided to API methods in an Array of UrlFilters.
     *  For example, webNavigation listeners can be added with a filter which is an object with a single url property that is an Array of UrlFilters, e.g. {url:[UrlFilter,UrlFilter,...]}.
     *  If any filter within the Array of UrlFilters matches, then it is considered a match for the Array.
     *  Effectively, the criteria specified within a single filter are AND'ed together, while all of the individual filters within an Array are OR'ed.
     *  All criteria are case sensitive.
     *  Browser compatibility: Chrome, Firefox(50), Opera, Firefox for Android (50)
     */
    export interface UrlFilter {
        /**
         * Optional. Matches if the hostname of the URL contains the given string.
         * To test whether a hostname component starts with "foo", use ".foo".
         * This matches "www.foobar.com" and "foo.com", because an implicit dot is added at the beginning of the hostname.
         * To test whether a hostname component ends with "foo", use "foo.".
         * To test whether a hostname component exactly matches "foo", use ".foo.".
         */
        hostContains?: string;
        /** Optional. Matches if the hostname of the URL is equal to a specified string.  */
        hostEquals?: string;
        /** Optional. Matches if the hostname of the URL starts with a specified string.  */
        hostPrefix?: string;
        /**
         * Optional. Matches if the hostname of the URL ends with a specified string.
         * Example: ".example.com" matches "http://www.example.com/", but not "http://example.com/".
         * Example: "example.com" matches "http://www.example.com/", and "http://fakeexample.com/".
         */
        hostSuffix?: string;
        /** Optional. Matches if the path segment of the URL contains a specified string. */
        pathContains?: string;
        /** Matches if the path segment of the URL is equal to a specified string. */
        pathEquals?: string;
        /** Optional. Matches if the path segment of the URL starts with a specified string. */
        pathPrefix?: string;
        /** Optional. Matches if the path segment of the URL ends with a specified string. */
        pathSuffix?: string;
        /** Optional. Matches if the query segment of the URL contains a specified string. */
        queryContains?: string;
        /** Optional. Matches if the query segment of the URL is equal to a specified string.  */
        queryEquals?: string;
        /** Optional. Matches if the query segment of the URL starts with a specified string.  */
        queryPrefix?: string;
        /** Optional. Matches if the query segment of the URL ends with a specified string.  */
        querySuffix?: string;
        /** Optional. Matches if the URL (without fragment identifier) contains a specified string. Port numbers are stripped from the URL if they match the default port number.  */
        urlContains?: string;
        /** Optional. Matches if the URL (without fragment identifier) is equal to a specified string. Port numbers are stripped from the URL if they match the default port number.  */
        urlEquals?: string;
        /**
         * Optional. Matches if the URL (without fragment identifier) matches a specified regular expression.
         * Port numbers are stripped from the URL if they match the default port number.
         * For example: urlMatches: "^[^:]*:(?://)?(?:[^/]*\\.)?mozilla\\.org/.*$" matches "http://mozilla.org/", "https://developer.mozilla.org/", "ftp://foo.mozilla.org/", but not "https://developer.fakemozilla.org/".
         */
        urlMatches?: string;
        /**
         * Optional. Matches if the URL without query segment and fragment identifier matches a specified regular expression.
         * Port numbers are stripped from the URL if they match the default port number
         */
        originAndPathMatches?: string;
        /**
         * Optional. Matches if the URL (without fragment identifier) starts with a specified string.
         * Port numbers are stripped from the URL if they match the default port number.
         * Example: "https://developer" matches "https://developer.mozilla.org/" and "https://developers.facebook.com/".
         */
        urlPrefix?: string;
        /**
         * Optional. Matches if the URL (without fragment identifier) ends with a specified string.
         * Port numbers are stripped from the URL if they match the default port number.
         * Note that an implicit forward slash "/" is added after the host, so "com/" matches "https://example.com", but "com" does not.
         */
        urlSuffix?: string;
        /**
         * Optional. Matches if the scheme of the URL is equal to any of the schemes specified in the array.
         * Because schemes are always converted to lowercase, this should always be given in lowercase or it will never match.
         * Example: ["https"] will match only HTTPS URLs.
         */
        schemes?: string[];
        /**
         * Optional. An array which may contain integers and arrays of integers.
         * Integers are interpreted as port numbers, while arrays of integers are interpreted as port ranges.
         * Matches if the port of the URL matches any port number or is contained in any ranges.
         * For example: [80, 443, [1000, 1200]] matches all requests on ports 80, 443, and in the range 1000-1200.
         */
        ports?: number[] | Array<Array<number>>;
    }

    /**
     * An object which allows the addition and removal of listeners for a browser event.
     * Browser compatibility: Chrome, Opera
     */
    export interface Event<T extends Function> {
        /**
         * Registers an event listener callback to an event.
         * @param callback Called when an event occurs. The parameters of this function depend on the type of event.
         * The callback parameter should be a function that looks like this:
         * function() {...};
         * Browser compatibility: Chrome, Firefox, Opera
         */
        addListener(callback: T): void;

        /**
         * @param callback Listener whose registration status shall be tested.
         * Browser compatibility: Chrome, Firefox, Opera
         */
        hasListener(callback: T): boolean;
        hasListeners(): boolean;

        /**
         * Deregisters an event listener callback from an event.
         * @param callback Listener that shall be unregistered.
         * The callback parameter should be a function that looks like this:
         * function() {...};
         * Browser compatibility: Chrome, Firefox, Opera
         */
        removeListener(callback: T): void;

        /**
         * Returns currently registered rules.
         * @param callback Called with registered rules.
         * The callback parameter should be a function that looks like this:
         * function(array of Rule rules) {...};
         * Parameter rules: Rules that were registered, the optional parameters are filled with values.
         */
        getRules(callback: (rules: Rule[]) => void): void;

        /**
         * Returns currently registered rules.
         * @param ruleIdentifiers If an array is passed, only rules with identifiers contained in this array are returned.
         * @param callback Called with registered rules.
         * The callback parameter should be a function that looks like this:
         * function(array of Rule rules) {...};
         * Parameter rules: Rules that were registered, the optional parameters are filled with values.
         */
        getRules(ruleIdentifiers: string[], callback: (rules: Rule[]) => void): void;

        /**
         * Unregisters currently registered rules.
         * @param ruleIdentifiers If an array is passed, only rules with identifiers contained in this array are unregistered.
         * @param callback Called when rules were unregistered.
         * If you specify the callback parameter, it should be a function that looks like this:
         * function() {...};
         */
        removeRules(ruleIdentifiers?: string[], callback?: () => void): void;

        /**
         * Unregisters currently registered rules.
         * @param callback Called when rules were unregistered.
         * If you specify the callback parameter, it should be a function that looks like this:
         * function() {...};
         */
        removeRules(callback?: () => void): void;

        /**
         * Registers rules to handle events.
         * @param rules Rules to be registered. These do not replace previously registered rules.
         * @param callback Called with registered rules.
         * If you specify the callback parameter, it should be a function that looks like this:
         * function(array of Rule rules) {...};
         * Parameter rules: Rules that were registered, the optional parameters are filled with values.
         */
        addRules(rules: Rule[], callback?: (rules: Rule[]) => void): void;
    }

    /**
     * Description of a declarative rule for handling events.
     * Browser compatibility: Chrome, Opera
     */
    export interface Rule {
        /** Optional. Optional priority of this rule. Defaults to 100.  */
        priority?: number;
        /** List of conditions that can trigger the actions. */
        conditions: any[];
        /** Optional. Optional identifier that allows referencing this rule.  */
        id?: string;
        /** List of actions that are triggered if one of the conditions is fulfilled. */
        actions: any[];
        /**
         * Optional.
         * Since Firefox 28.
         * Tags can be used to annotate rules and perform operations on sets of rules.
         */
        tags?: string[];
    }
}
