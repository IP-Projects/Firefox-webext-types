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
        /** Optional. Tags can be used to annotate rules and perform operations on sets of rules. */
        tags?: string[];
    }
}

////////////////////
// Context Menus
////////////////////
/**
 * Same namespace as the one Chrome uses, it can be used interchangeably with the 'menus' namespace with minimum drawbacks.
 * Use the browser.contextMenus API to add items to Firefox's context menu. You can choose what types of objects your context menu additions apply to, such as images, hyperlinks, and pages.
 * Browser compatibility: Chrome, Firefox, Opera
 * Permissions:  "contextMenus"
 */
declare namespace browser.contextMenus {
    type contextType =
        | "all"
        | "audio"
        | "bookmark"
        | "browser_action"
        | "editable"
        | "frame"
        | "image"
        | "link"
        | "page"
        | "page_action"
        | "password"
        | "selection"
        | "tab"
        | "tools_menu"
        | "video";

    type itemType = "normal" | "checkbox" | "radio" | "separator";

    type modifiersType = "Alt" | "Command" | "Ctrl" | "MacCtrl" | "Shift";

    type viewType = "tab" | "popup" | "sidebar";

    /**
     * "_execute_browser_action": simulate a click on the extension's browser action, opening its popup if it has one
     * "_execute_page_action": simulate a click on the extension's page action, opening its popup if it has one
     * "_execute_sidebar_action": open the extension's sidebar
     */
    type commandType =
        | "_execute_browser_action"
        | "_execute_page_action"
        | "_execute_sidebar_action";

    /**
     * Information passed to the menus.onClicked event listener when a menu item is clicked
     */
    export interface OnClickData {
        /** Optional. The ID of the bookmark where the context menu was clicked. */
        bookmarkId?: string;

        /** Optional. Which mouse button was pressed. The values are the same as for MouseEvent.button */
        button?: number;

        /** Optional. A flag indicating whether a checkbox or radio item was checked after it was clicked.*/
        checked?: boolean;

        /**A flag indicating whether the element is editable: for example, if it is a textarea */
        editable: boolean;

        /**
         * Optional.The ID of the frame in which the item was clicked.
         * The frame ID can be used in other APIs that accept frame IDs, such as tabs.sendMessage().
         * If the item was clicked in the top level document, frameId is zero.
         * If the item was clicked outside the page entirely (for example, in the tools_menu or tab context), then frameId is undefined.
         */
        frameId?: number;

        /** Optional. The URL of the frame of the element where the context menu was clicked, if it was in a frame. */
        frameUrl?: string;

        /** Optional. If the element is a link, the text for the link. If the link contains no text, the URL itself is given here. */
        linkText?: string;

        /** Optional.If the element is a link, the URL it points to */
        linkUrl?: string;

        /** Optional. One of "image", "video", or "audio" if the context menu was activated on one of these types of elements */
        mediaType?: string;

        /** The ID of the menu item that was clicked. */
        menuItemId: number | string;

        /**
         * An array containing any modifier keys that were pressed when the item was clicked.
         * Possible values are: "Alt", "Command", "Ctrl", "MacCtrl", and "Shift". On a Mac, if the user has the Control key pressed, then both "Ctrl" and "MacCtrl" are included.
         */
        modifiers: modifiersType[];

        /** The URL of the page in which the menu item was clicked. This property is not present if the click occurred in a context where there is no current page, such as on a browser action */
        pageUrl?: string;

        /** The parent ID, if any, for the item clicked. */
        parentMenuItemId?: number | string;

        /** Optional. If some text was selected in the page, this contains the selected text. */
        selectionText?: string;

        /** Optional. Will be present for elements with a "src" URL. */
        srcUrl?: string;

        /** Optional. An identifier of the element, if any, over which the context menu was created. Use menus.getTargetElement() in the content script to locate the element. Note that this is not the id attribute of the page element. */
        targetElementId?: number;

        /** Optional. The type of extension view. */
        viewType?: viewType;

        /** Optional.A flag indicating whether a checkbox or radio item was checked before it was clicked. */
        wasChecked?: boolean;
    }

    export interface CreateProperties {
        /** Optional. The initial state of a checkbox or radio item: true for selected and false for unselected. Only one radio item can be selected at a time in a given group of radio items.  */
        checked?: boolean;

        /** Optional. String describing an action that should be taken when the user clicks the item. Possible values are */
        command?: commandType;

        /** Optional. Array of contexts in which this menu item will appear. This option is omitted:
         * if the item's parent has contexts set, then this item will inherit its parent's contexts
         * otherwise, the item is given a context array of ["page"].
         */
        contexts?: string[];

        /** Optional. Lets you restrict the item to apply only to documents whose URL matches one of the given match patterns. This applies to frames as well.  */
        documentUrlPatterns?: string[];

        /** Optional.Whether this menu item is enabled or disabled. Defaults to true. */
        enabled?: boolean;

        /**
         * Optional. One or more custom icons to display next to the item. Custom icons can only be set for items appearing in submenus.
         * This property is an object with one property for each supplied icon: the property's name should include the icon's size in pixels, and path is relative to the icon from the extension's root directory.
         * The browser tries to choose a 16x16 pixel icon for a normal display or a 32x32 pixel icon for a high-density display
         */
        icons?: Object;

        /** Optional.The unique ID to assign to this item. Mandatory for event pages. Cannot be the same as another ID for this extension */
        id?: string;

        /**
         * Optional. A function that will be called when the menu item is clicked. Event pages cannot use this: instead, they should register a listener for menus.onClicked
         * @param info Information sent when a context menu item is clicked.
         * @param tab The details of the tab where the click took place. Note: this parameter only present for extensions.
         */
        onclick?: (info: OnClickData, tab: browser.tabs.Tab) => void;

        /** Optional. The ID of a parent menu item; this makes the item a child of a previously added item. Note: If you have created more than one menu item, then the items will be placed in a submenu. The submenu's parent will be labeled with the name of the extension.  */
        parentId?: number | string;

        /** Optional. Similar to documentUrlPatterns, but lets you filter based on the href of anchor tags and the src attribute of img/audio/video tags. This parameter supports any URL scheme, even those that are usually not allowed in a match pattern.  */
        targetUrlPatterns?: string[];

        /** Optional. The text to be displayed in the item; this is required unless type is 'separator'. When the context is 'selection', you can use %s within the string to show the selected text. For example, if this parameter's value is "Translate '%s' to Pig Latin" and the user selects the word "cool", the context menu item for the selection is "Translate 'cool' to Pig Latin".  */
        title?: string;

        /** Optional. The type of menu item: "normal", "checkbox", "radio", "separator". Defaults to "normal".  */
        type?: itemType;

        /**
         * Optional. List of view types where the menu item will be shown. Defaults to any view, including those without a viewType
         */
        viewTypes?: viewType[];

        /** Optional.Whether the item is shown in the menu. Defaults to true */
        visible?: boolean;
    }

    export interface UpdateProperties {
        /** Optional.The initial state of a checkbox or radio item: true for selected and false for unselected. Only one radio item can be selected at a time in a given group of radio items. */
        checked?: boolean;

        /** Optional.String describing an action that should be taken when the user clicks the item. */
        command?: "_execute_browser_action" | "_execute_page_action" | "_execute_sidebar_action";

        /** Optional.Array of contexts in which this menu item will appear. If this option is omitted. */
        contexts?: contextType[];

        /** Optional.Lets you restrict the item to apply only to documents whose URL matches one of the given match patterns. This applies to frames as well. */
        documentUrlPatterns?: string[];

        /** Optional.Whether this menu item is enabled or disabled. Defaults to true. */
        enabled?: boolean;

        /**
         * Optional. One or more custom icons to display next to the item. Custom icons can only be set for items appearing in submenus.
         * This property is an object with one property for each supplied icon: the property's name should include the icon's size in pixels, and path is relative to the icon from the extension's root directory.
         * The browser tries to choose a 16x16 pixel icon for a normal display or a 32x32 pixel icon for a high-density display
         */
        icons?: Object;

        /** Optional.The unique ID to assign to this item. Mandatory for event pages. Cannot be the same as another ID for this extension */
        id?: string;

        /**
         * Optional. A function that will be called when the menu item is clicked. Event pages cannot use this: instead, they should register a listener for menus.onClicked
         * @param info Information sent when a context menu item is clicked.
         * @param tab The details of the tab where the click took place. Note: this parameter only present for extensions.
         */
        onclick?: (info: OnClickData, tab: browser.tabs.Tab) => void;

        /** Optional. The ID of a parent menu item; this makes the item a child of a previously added item. Note: If you have created more than one menu item, then the items will be placed in a submenu. The submenu's parent will be labeled with the name of the extension.  */
        parentId?: number | string;

        /** Optional. Similar to documentUrlPatterns, but lets you filter based on the href of anchor tags and the src attribute of img/audio/video tags. This parameter supports any URL scheme, even those that are usually not allowed in a match pattern.  */
        targetUrlPatterns?: string[];

        /** Optional. The text to be displayed in the item; this is required unless type is 'separator'. When the context is 'selection', you can use %s within the string to show the selected text. For example, if this parameter's value is "Translate '%s' to Pig Latin" and the user selects the word "cool", the context menu item for the selection is "Translate 'cool' to Pig Latin".  */
        title?: string;

        /** Optional. The type of menu item: "normal", "checkbox", "radio", "separator". Defaults to "normal".  */
        type?: itemType;

        /**
         * Optional. List of view types where the menu item will be shown. Defaults to any view, including those without a viewType
         */
        viewTypes?: viewType[];

        /** Optional.Whether the item is shown in the menu. Defaults to true */
        visible?: boolean;
    }

    export interface ContextOptions {
        bookmarkId?: string;
        context?: contextType;
        showDefaults?: boolean;
        tabId?: string;
    }

    /**
     * Creates a new menu item, given an options object defining properties for the item.
     * Unlike other asynchronous functions, this one does not return a promise, but uses an optional callback to communicate success or failure. This is because its return value is the ID of the new item.
     * For compatibility with other browsers, Firefox makes this method available via the contextMenus namespace as well as the menus namespace. Note though that it's not possible to create tools menu items (contexts: ["tools_menu"]) using the contextMenus namespace.
     * @param callback Called when the item has been created in the browser. If there were any problems creating the item, details will be available in browser.runtime.lastError.
     * If you specify the callback parameter, it should be a function that looks like this:
     * function() {...};
     */
    export function create(
        createProperties: CreateProperties,
        callback?: () => void
    ): number | string;

    /**
     * This method is available to all extension script contexts (content scripts, background pages and other extension pages) and returns the element for a given info.targetElementId, provided that the element still exists in the document where the method is invoked.
     * The method only works in the document that includes the right-clicked element and the targetElementId expires when the user opens another context menu
     * @param targetElementId The property of the menus.OnClickData object passed to the menus.onClicked handler or menus.onShown event
     */
    export function getTargetElement(targetElementId: number): object | null;

    /**
     * This API becomes callable only if the addon has the "menus.overrideContext" permission
     * This API allows extensions to hide all default Firefox menu items in favor of providing a custom context menu UI.
     * This context menu can consist of multiple top-level menu items from the extension, and may optionally include tab or bookmark context menu items from other extensions.
     * This should be called during a contextmenu DOM event handler, and only applies to the menu that opens after this event.
     */
    export function overrideContext(contextOptions: ContextOptions): void;

    export function refresh(): Promise<void>;

    /**
     * Removes a context menu item.
     * @param menuItemId The ID of the context menu item to remove.
     */
    export function remove(menuItemId: string): Promise<void>;
    /**
     * Removes a context menu item.
     * @param menuItemId The ID of the context menu item to remove.
     */
    export function remove(menuItemId: string): Promise<void>;

    /**
     * Removes all context menu items added by this extension.
     */
    export function removeAll(): Promise<void>;

    /**
     * Updates a previously created context menu item.
     * @param id The ID of the item to update.
     * @param updateProperties The properties to update. Accepts the same values as the create function.
     * @param callback Called when the context menu has been updated.
     * If you specify the callback parameter, it should be a function that looks like this:
     * function() {...};
     */
    export function update(
        id: string,
        updateProperties: UpdateProperties,
        callback?: () => void
    ): void;
    /**
     * Updates a previously created context menu item.
     * @param id The ID of the item to update.
     * @param updateProperties The properties to update. Accepts the same values as the create function.
     * @param callback Called when the context menu has been updated.
     * If you specify the callback parameter, it should be a function that looks like this:
     * function() {...};
     */
    export function update(
        id: number,
        updateProperties: UpdateProperties,
        callback?: () => void
    ): void;

    /**
     * The maximum number of top level extension items that can be added to an extension action context menu. Any items beyond this limit will be ignored.
     */
    export var ACTION_MENU_TOP_LEVEL_LIMIT: number;

    export interface MenuClickedEvent
        extends browser.events.Event<(info: OnClickData, tab?: browser.tabs.Tab) => void> {}

    export interface MenuHideEvent extends browser.events.Event<() => void> {}

    export interface MenuShowEvent
        extends browser.events.Event<(info: OnClickData, tab: browser.tabs.Tab) => void> {}

    export var onClicked: MenuClickedEvent;
    export var onHidden: MenuHideEvent;
    export var onShown: MenuShowEvent;
}

////////////////////
// Context Menus - Menus
////////////////////
/**
 * Same namespace as the one Chrome uses, it can be used interchangeably with the 'contextMenus' namespace with minimum added capabilities.
 * Use the browser.contextMenus API to add items to Firefox's context menu. You can choose what types of objects your context menu additions apply to, such as images, hyperlinks, and pages.
 * Browser compatibility: Firefox
 * Permissions: "menus"
 */
declare namespace browser.menus {
    type contextType =
        | "all"
        | "audio"
        | "bookmark"
        | "browser_action"
        | "editable"
        | "frame"
        | "image"
        | "link"
        | "page"
        | "page_action"
        | "password"
        | "selection"
        | "tab"
        | "tools_menu"
        | "video";

    type itemType = "normal" | "checkbox" | "radio" | "separator";

    type modifiersType = "Alt" | "Command" | "Ctrl" | "MacCtrl" | "Shift";

    type viewType = "tab" | "popup" | "sidebar";

    /**
     * "_execute_browser_action": simulate a click on the extension's browser action, opening its popup if it has one
     * "_execute_page_action": simulate a click on the extension's page action, opening its popup if it has one
     * "_execute_sidebar_action": open the extension's sidebar
     */
    type commandType =
        | "_execute_browser_action"
        | "_execute_page_action"
        | "_execute_sidebar_action";

    /**
     * Information passed to the menus.onClicked event listener when a menu item is clicked
     */
    export interface OnClickData {
        /** Optional. The ID of the bookmark where the context menu was clicked. */
        bookmarkId?: string;

        /** Optional. Which mouse button was pressed. The values are the same as for MouseEvent.button */
        button?: number;

        /** Optional. A flag indicating whether a checkbox or radio item was checked after it was clicked.*/
        checked?: boolean;

        /**A flag indicating whether the element is editable: for example, if it is a textarea */
        editable: boolean;

        /**
         * Optional.The ID of the frame in which the item was clicked.
         * The frame ID can be used in other APIs that accept frame IDs, such as tabs.sendMessage().
         * If the item was clicked in the top level document, frameId is zero.
         * If the item was clicked outside the page entirely (for example, in the tools_menu or tab context), then frameId is undefined.
         */
        frameId?: number;

        /** Optional. The URL of the frame of the element where the context menu was clicked, if it was in a frame. */
        frameUrl?: string;

        /** Optional. If the element is a link, the text for the link. If the link contains no text, the URL itself is given here. */
        linkText?: string;

        /** Optional.If the element is a link, the URL it points to */
        linkUrl?: string;

        /** Optional. One of "image", "video", or "audio" if the context menu was activated on one of these types of elements */
        mediaType?: string;

        /** The ID of the menu item that was clicked. */
        menuItemId: number | string;

        /**
         * An array containing any modifier keys that were pressed when the item was clicked.
         * Possible values are: "Alt", "Command", "Ctrl", "MacCtrl", and "Shift". On a Mac, if the user has the Control key pressed, then both "Ctrl" and "MacCtrl" are included.
         */
        modifiers: modifiersType[];

        /** The URL of the page in which the menu item was clicked. This property is not present if the click occurred in a context where there is no current page, such as on a browser action */
        pageUrl?: string;

        /** The parent ID, if any, for the item clicked. */
        parentMenuItemId?: number | string;

        /** Optional. If some text was selected in the page, this contains the selected text. */
        selectionText?: string;

        /** Optional. Will be present for elements with a "src" URL. */
        srcUrl?: string;

        /** Optional. An identifier of the element, if any, over which the context menu was created. Use menus.getTargetElement() in the content script to locate the element. Note that this is not the id attribute of the page element. */
        targetElementId?: number;

        /** Optional. The type of extension view. */
        viewType?: viewType;

        /** Optional.A flag indicating whether a checkbox or radio item was checked before it was clicked. */
        wasChecked?: boolean;
    }

    export interface CreateProperties {
        /** Optional. The initial state of a checkbox or radio item: true for selected and false for unselected. Only one radio item can be selected at a time in a given group of radio items.  */
        checked?: boolean;

        /** Optional. String describing an action that should be taken when the user clicks the item. Possible values are */
        command?: commandType;

        /** Optional. Array of contexts in which this menu item will appear. This option is omitted:
         * if the item's parent has contexts set, then this item will inherit its parent's contexts
         * otherwise, the item is given a context array of ["page"].
         */
        contexts?: string[];

        /** Optional. Lets you restrict the item to apply only to documents whose URL matches one of the given match patterns. This applies to frames as well.  */
        documentUrlPatterns?: string[];

        /** Optional.Whether this menu item is enabled or disabled. Defaults to true. */
        enabled?: boolean;

        /**
         * Optional. One or more custom icons to display next to the item. Custom icons can only be set for items appearing in submenus.
         * This property is an object with one property for each supplied icon: the property's name should include the icon's size in pixels, and path is relative to the icon from the extension's root directory.
         * The browser tries to choose a 16x16 pixel icon for a normal display or a 32x32 pixel icon for a high-density display
         */
        icons?: Object;

        /** Optional.The unique ID to assign to this item. Mandatory for event pages. Cannot be the same as another ID for this extension */
        id?: string;

        /**
         * Optional. A function that will be called when the menu item is clicked. Event pages cannot use this: instead, they should register a listener for menus.onClicked
         * @param info Information sent when a context menu item is clicked.
         * @param tab The details of the tab where the click took place. Note: this parameter only present for extensions.
         */
        onclick?: (info: OnClickData, tab: browser.tabs.Tab) => void;

        /** Optional. The ID of a parent menu item; this makes the item a child of a previously added item. Note: If you have created more than one menu item, then the items will be placed in a submenu. The submenu's parent will be labeled with the name of the extension.  */
        parentId?: number | string;

        /** Optional. Similar to documentUrlPatterns, but lets you filter based on the href of anchor tags and the src attribute of img/audio/video tags. This parameter supports any URL scheme, even those that are usually not allowed in a match pattern.  */
        targetUrlPatterns?: string[];

        /** Optional. The text to be displayed in the item; this is required unless type is 'separator'. When the context is 'selection', you can use %s within the string to show the selected text. For example, if this parameter's value is "Translate '%s' to Pig Latin" and the user selects the word "cool", the context menu item for the selection is "Translate 'cool' to Pig Latin".  */
        title?: string;

        /** Optional. The type of menu item: "normal", "checkbox", "radio", "separator". Defaults to "normal".  */
        type?: itemType;

        /**
         * Optional. List of view types where the menu item will be shown. Defaults to any view, including those without a viewType
         */
        viewTypes?: viewType[];

        /** Optional.Whether the item is shown in the menu. Defaults to true */
        visible?: boolean;
    }

    export interface UpdateProperties {
        /** Optional.The initial state of a checkbox or radio item: true for selected and false for unselected. Only one radio item can be selected at a time in a given group of radio items. */
        checked?: boolean;

        /** Optional.String describing an action that should be taken when the user clicks the item. */
        command?: "_execute_browser_action" | "_execute_page_action" | "_execute_sidebar_action";

        /** Optional.Array of contexts in which this menu item will appear. If this option is omitted. */
        contexts?: contextType[];

        /** Optional.Lets you restrict the item to apply only to documents whose URL matches one of the given match patterns. This applies to frames as well. */
        documentUrlPatterns?: string[];

        /** Optional.Whether this menu item is enabled or disabled. Defaults to true. */
        enabled?: boolean;

        /**
         * Optional. One or more custom icons to display next to the item. Custom icons can only be set for items appearing in submenus.
         * This property is an object with one property for each supplied icon: the property's name should include the icon's size in pixels, and path is relative to the icon from the extension's root directory.
         * The browser tries to choose a 16x16 pixel icon for a normal display or a 32x32 pixel icon for a high-density display
         */
        icons?: Object;

        /** Optional.The unique ID to assign to this item. Mandatory for event pages. Cannot be the same as another ID for this extension */
        id?: string;

        /**
         * Optional. A function that will be called when the menu item is clicked. Event pages cannot use this: instead, they should register a listener for menus.onClicked
         * @param info Information sent when a context menu item is clicked.
         * @param tab The details of the tab where the click took place. Note: this parameter only present for extensions.
         */
        onclick?: (info: OnClickData, tab: browser.tabs.Tab) => void;

        /** Optional. The ID of a parent menu item; this makes the item a child of a previously added item. Note: If you have created more than one menu item, then the items will be placed in a submenu. The submenu's parent will be labeled with the name of the extension.  */
        parentId?: number | string;

        /** Optional. Similar to documentUrlPatterns, but lets you filter based on the href of anchor tags and the src attribute of img/audio/video tags. This parameter supports any URL scheme, even those that are usually not allowed in a match pattern.  */
        targetUrlPatterns?: string[];

        /** Optional. The text to be displayed in the item; this is required unless type is 'separator'. When the context is 'selection', you can use %s within the string to show the selected text. For example, if this parameter's value is "Translate '%s' to Pig Latin" and the user selects the word "cool", the context menu item for the selection is "Translate 'cool' to Pig Latin".  */
        title?: string;

        /** Optional. The type of menu item: "normal", "checkbox", "radio", "separator". Defaults to "normal".  */
        type?: itemType;

        /**
         * Optional. List of view types where the menu item will be shown. Defaults to any view, including those without a viewType
         */
        viewTypes?: viewType[];

        /** Optional.Whether the item is shown in the menu. Defaults to true */
        visible?: boolean;
    }

    export interface ContextOptions {
        bookmarkId?: string;
        context?: contextType;
        showDefaults?: boolean;
        tabId?: string;
    }

    /**
     * Creates a new menu item, given an options object defining properties for the item.
     * Unlike other asynchronous functions, this one does not return a promise, but uses an optional callback to communicate success or failure. This is because its return value is the ID of the new item.
     * For compatibility with other browsers, Firefox makes this method available via the menus namespace as well as the menus namespace. Note though that it's not possible to create tools menu items (contexts: ["tools_menu"]) using the menus namespace.
     * @param callback Called when the item has been created in the browser. If there were any problems creating the item, details will be available in browser.runtime.lastError.
     * If you specify the callback parameter, it should be a function that looks like this:
     * function() {...};
     */
    export function create(
        createProperties: CreateProperties,
        callback?: () => void
    ): number | string;

    /**
     * This method is available to all extension script contexts (content scripts, background pages and other extension pages) and returns the element for a given info.targetElementId, provided that the element still exists in the document where the method is invoked.
     * The method only works in the document that includes the right-clicked element and the targetElementId expires when the user opens another context menu
     * @param targetElementId The property of the menus.OnClickData object passed to the menus.onClicked handler or menus.onShown event
     */
    export function getTargetElement(targetElementId: number): object | null;

    /**
     * This API becomes callable only if the addon has the "menus.overrideContext" permission
     * This API allows extensions to hide all default Firefox menu items in favor of providing a custom context menu UI.
     * This context menu can consist of multiple top-level menu items from the extension, and may optionally include tab or bookmark context menu items from other extensions.
     * This should be called during a contextmenu DOM event handler, and only applies to the menu that opens after this event.
     */
    export function overrideContext(contextOptions: ContextOptions): void;

    export function refresh(): Promise<void>;

    /**
     * Removes a context menu item.
     * @param menuItemId The ID of the context menu item to remove.
     */
    export function remove(menuItemId: string): Promise<void>;
    /**
     * Removes a context menu item.
     * @param menuItemId The ID of the context menu item to remove.
     */
    export function remove(menuItemId: string): Promise<void>;

    /**
     * Removes all context menu items added by this extension.
     */
    export function removeAll(): Promise<void>;

    /**
     * Updates a previously created context menu item.
     * @param id The ID of the item to update.
     * @param updateProperties The properties to update. Accepts the same values as the create function.
     * @param callback Called when the context menu has been updated.
     * If you specify the callback parameter, it should be a function that looks like this:
     * function() {...};
     */
    export function update(
        id: string,
        updateProperties: UpdateProperties,
        callback?: () => void
    ): void;
    /**
     * Updates a previously created context menu item.
     * @param id The ID of the item to update.
     * @param updateProperties The properties to update. Accepts the same values as the create function.
     * @param callback Called when the context menu has been updated.
     * If you specify the callback parameter, it should be a function that looks like this:
     * function() {...};
     */
    export function update(
        id: number,
        updateProperties: UpdateProperties,
        callback?: () => void
    ): void;

    /**
     * The maximum number of top level extension items that can be added to an extension action context menu. Any items beyond this limit will be ignored.
     */
    export var ACTION_MENU_TOP_LEVEL_LIMIT: number;

    export interface MenuClickedEvent
        extends browser.events.Event<(info: OnClickData, tab?: browser.tabs.Tab) => void> {}

    export interface MenuHideEvent extends browser.events.Event<() => void> {}

    export interface MenuShowEvent
        extends browser.events.Event<(info: OnClickData, tab: browser.tabs.Tab) => void> {}

    export var onClicked: MenuClickedEvent;
    export var onHidden: MenuHideEvent;
    export var onShown: MenuShowEvent;
}
