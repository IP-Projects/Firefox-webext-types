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
         *  To get the number of milliseconds between the epoch and the current time, use Date.now().
         *  If you specify when, don't specify delayInMinutes.
         */
        when?: number;
        /**
         * Optional. The time the alarm will fire first, given as minutes from the time the alarm is set.
         *  If you specify delayInMinutes, don't specify when.
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

    /** Fired when an alarm has elapsed. Useful for event pages.
     * Browser compatibility: Chrome, Firefox(45), Opera, Firefox for Android (48)
     */
    export var onAlarm: AlarmEvent;
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
         * Matches if the port of the URL matches any port numer or is contained in any ranges.
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
         */
        addListener(callback: T): void;
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
         * @param callback Listener whose registration status shall be tested.
         */
        hasListener(callback: T): boolean;
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
        /**
         * Deregisters an event listener callback from an event.
         * @param callback Listener that shall be unregistered.
         * The callback parameter should be a function that looks like this:
         * function() {...};
         */
        removeListener(callback: T): void;
        hasListeners(): boolean;
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
